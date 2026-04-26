// Build-time fetcher for GitHub stats. Falls back to existing JSON on failure
// so static builds remain reproducible offline.
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const USER = "maruyamayasuaki";
const OUT = path.join(process.cwd(), "lib", "github-stats.json");

async function gh(endpoint) {
  const res = await fetch(`https://api.github.com${endpoint}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "portfolio-build",
    },
  });
  if (!res.ok) throw new Error(`${endpoint} → ${res.status}`);
  return res.json();
}

async function main() {
  try {
    const [user, repos] = await Promise.all([
      gh(`/users/${USER}`),
      gh(`/users/${USER}/repos?per_page=100&sort=updated`),
    ]);

    const ownedRepos = repos.filter((r) => !r.fork);

    // Aggregate languages across the top recently-pushed repos.
    const topRepos = ownedRepos.slice(0, 12);
    const languageBuckets = {};
    await Promise.all(
      topRepos.map(async (r) => {
        try {
          const langs = await gh(`/repos/${USER}/${r.name}/languages`);
          for (const [k, v] of Object.entries(langs)) {
            languageBuckets[k] = (languageBuckets[k] || 0) + v;
          }
        } catch {
          /* ignore individual failures */
        }
      }),
    );

    const totalStars = ownedRepos.reduce((s, r) => s + (r.stargazers_count || 0), 0);

    const featured = ownedRepos
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 8)
      .map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        updated: r.pushed_at,
        topics: r.topics ?? [],
      }));

    const stats = {
      generatedAt: new Date().toISOString(),
      user: {
        login: user.login,
        name: user.name,
        bio: user.bio,
        publicRepos: user.public_repos,
        followers: user.followers,
        following: user.following,
        avatarUrl: user.avatar_url,
        htmlUrl: user.html_url,
      },
      totals: {
        stars: totalStars,
        repos: ownedRepos.length,
      },
      languages: Object.fromEntries(
        Object.entries(languageBuckets).sort((a, b) => b[1] - a[1]),
      ),
      featured,
    };

    await writeFile(OUT, JSON.stringify(stats, null, 2));
    console.log(`[github-stats] wrote ${OUT}: ${ownedRepos.length} repos, ${Object.keys(languageBuckets).length} languages`);
  } catch (err) {
    console.warn(`[github-stats] fetch failed (${err.message}); keeping existing snapshot if any.`);
    try {
      await readFile(OUT, "utf8");
      console.warn("[github-stats] existing snapshot reused.");
    } catch {
      // No snapshot — write minimal placeholder so the build doesn't crash.
      const placeholder = {
        generatedAt: null,
        user: { login: USER, name: "Yasuaki Maruyama", bio: null, publicRepos: 0, followers: 0, following: 0, avatarUrl: "", htmlUrl: `https://github.com/${USER}` },
        totals: { stars: 0, repos: 0 },
        languages: {},
        featured: [],
      };
      await writeFile(OUT, JSON.stringify(placeholder, null, 2));
      console.warn("[github-stats] wrote placeholder snapshot.");
    }
  }
}

main();
