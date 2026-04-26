export type Lang = "ja" | "en";

export const translations = {
  ja: {
    nav: { about: "About", exp: "Experience", research: "研究業績", projects: "Projects", beyond: "Beyond", contact: "Contact" },
    hero: {
      kicker: "Material Informatics × ML Engineer",
      name: "丸山 泰明",
      lead: "材料科学と AI を橋渡しし、研究・産業 AI・プロダクト開発を横断するエンジニアリングを実践しています。",
      cta: "研究業績を見る",
    },
    about: {
      title: "About",
      sub: "研究と開発の両輪で価値を社会実装する。",
      cards: [
        { title: "Research", body: "京都大学大学院工学研究科にて Material Informatics を研究。能動的機械学習を活用した新材料の設計と物性解明に取り組んでいます。" },
        { title: "ML Engineer @ Athena Technologies", body: "2024年11月より参画。金融・製造・医療業界向けに産業 AI ソリューションを開発しています。" },
        { title: "Education", body: "京都大学大学院工学研究科 博士課程 1年 / 修士課程 修了 / 京都大学工学部 卒業" },
      ],
    },
    exp: {
      title: "Experience",
      sub: "Athena Technologies にて機械学習エンジニアとして産業 AI 開発に携わっています（2024年11月〜）。",
      items: [
        {
          title: "銀行向けセキュアローカル LLM",
          body: "インターネットから物理的に遮断した閉域ネットワーク上にローカル LLM を構築し、金融機関向け AI エージェントを開発。マスキング・稟議書レビュー・業務文書自動作成など複数のユースケースを実装。",
          tags: ["Local LLM", "Secure AI", "FinTech"],
          links: [
            { label: "記事①を見る →", url: "https://prtimes.jp/main/html/rd/p/000000021.000141002.html" },
            { label: "記事②を見る →", url: "https://prtimes.jp/main/html/rd/p/000000007.000141002.html" },
          ],
        },
        {
          title: "製造現場データ分析 AI",
          body: "製造ラインのセンサーデータ・業務ログを基に、異常検知や工程最適化を行う AI モデルを開発。データ分析から実装・運用まで一気通貫で担当。",
          tags: ["Machine Learning", "Data Analysis", "Manufacturing"],
          links: [],
        },
        {
          title: "医療向け RAG 専属 AI アプリ",
          body: "医療現場のナレッジベースを活用した RAG による専属 AI アシスタントを開発。正確性と応答速度の両立を重視した設計を担当。",
          tags: ["RAG", "LLM", "HealthTech"],
          links: [],
        },
      ],
    },
    research: {
      title: "研究業績",
      sub: "材料物性×機械学習による第一原理計算研究。能動学習を用いたひずみ設計の開拓に取り組んでいます。",
    },
    projects: {
      title: "Featured Projects",
      sub: "開発の幅広さと実装力を示すプロジェクト群。",
      items: [
        { title: "Local Discovery", body: "日本中の旅行先の飲食店を共有し合う Web アプリ。投稿・発見・共有の体験をシンプルに設計。", tags: ["Ruby", "JavaScript", "Rails"], link: { label: "GitHub →", url: "https://github.com/maruyamayasuaki/Local_Food_Discovery" } },
        { title: "Manimtube", body: "コンピューターサイエンス解説動画を集約する学習プラットフォーム。視聴導線と検索性を改善。", tags: ["Python", "Next.js", "PostgreSQL"], link: { label: "詳細を見る →", url: "https://topaz.dev/projects/b42a5a164623f875a260" } },
        { title: "Starbucks Map App", body: "スターバックス店舗を地図上で探索し、訪問スタンプを収集する Android アプリ。", tags: ["Kotlin", "Android", "Maps API"], link: null },
        { title: "Pomodoro Blocker", body: "ポモドーロ + サイトブロックを融合した Chrome 拡張。集中時間を最大化するツール。", tags: ["JavaScript", "Chrome Extension"], link: { label: "Qiita →", url: "https://qiita.com/yasu_qita/items/1a26adb8dff47c402d8e" } },
      ],
    },
    stack: {
      title: "Language & Stack",
      sub: "研究とプロダクト実装を横断する技術スタック。",
    },
    beyond: {
      title: "Beyond Engineering",
      sub: "エンジニア・研究者の顔の裏側。",
      items: [
        { icon: "🎵", title: "Bass Clarinet", body: "中学から続けるバスクラリネット奏者。大阪府立北野高校 OBOG 吹奏楽団に所属。", link: null },
        { icon: "🏃", title: "Marathon", body: "下関海響マラソン 2025 フルマラソン（42.195 km）完走。", link: null },
        { icon: "✍️", title: "Tech Writing", body: "AI・並列処理・Chrome 拡張など幅広いトピックで技術記事を執筆中。", link: { label: "Qiita を見る →", url: "https://qiita.com/yasu_qita" } },
      ],
    },
    contact: {
      title: "Contact",
      sub: "共同研究・開発相談・採用連絡などお気軽に。",
    },
  },
  en: {
    nav: { about: "About", exp: "Experience", research: "Research", projects: "Projects", beyond: "Beyond", contact: "Contact" },
    hero: {
      kicker: "Material Informatics × ML Engineer",
      name: "Yasuaki Maruyama",
      lead: "Bridging materials science and AI — spanning research, industrial AI, and product engineering.",
      cta: "View Research",
    },
    about: {
      title: "About",
      sub: "Driving value from both research and engineering.",
      cards: [
        { title: "Research", body: "Ph.D. candidate at Kyoto University Graduate School of Engineering, specializing in Material Informatics and active ML-based materials design." },
        { title: "ML Engineer @ Athena Technologies", body: "Joined November 2024. Building industrial AI solutions for finance, manufacturing, and healthcare." },
        { title: "Education", body: "Kyoto University — Ph.D. (Eng.) D1 / M.Eng. (completed) / B.Eng." },
      ],
    },
    exp: {
      title: "Experience",
      sub: "ML Engineer at Athena Technologies since November 2024, building industrial AI across diverse sectors.",
      items: [
        {
          title: "Secure Local LLM for Banking",
          body: "Built an air-gapped local LLM for a financial institution — implemented document masking, approval review, and automated business-document generation under strict security requirements.",
          tags: ["Local LLM", "Secure AI", "FinTech"],
          links: [
            { label: "Article 1 →", url: "https://prtimes.jp/main/html/rd/p/000000021.000141002.html" },
            { label: "Article 2 →", url: "https://prtimes.jp/main/html/rd/p/000000007.000141002.html" },
          ],
        },
        {
          title: "Manufacturing Data Analytics AI",
          body: "Developed ML models for anomaly detection and process optimization using factory sensor data and logs, covering the full lifecycle from analysis to deployment.",
          tags: ["Machine Learning", "Data Analysis", "Manufacturing"],
          links: [],
        },
        {
          title: "Medical RAG AI Assistant",
          body: "Built a RAG-based AI assistant leveraging a medical knowledge base, prioritizing factual accuracy and response speed.",
          tags: ["RAG", "LLM", "HealthTech"],
          links: [],
        },
      ],
    },
    research: {
      title: "Research",
      sub: "First-principles × machine learning research on materials properties. Pioneering active-learning-based strain engineering.",
    },
    projects: {
      title: "Featured Projects",
      sub: "A showcase of engineering breadth and implementation depth.",
      items: [
        { title: "Local Discovery", body: "A web app for sharing local restaurant discoveries across Japan.", tags: ["Ruby", "JavaScript", "Rails"], link: { label: "GitHub →", url: "https://github.com/maruyamayasuaki/Local_Food_Discovery" } },
        { title: "Manimtube", body: "A learning platform aggregating CS explainer videos. Improved discovery and navigation UX.", tags: ["Python", "Next.js", "PostgreSQL"], link: { label: "View details →", url: "https://topaz.dev/projects/b42a5a164623f875a260" } },
        { title: "Starbucks Map App", body: "An Android app to explore Starbucks locations on a map and collect visit stamps.", tags: ["Kotlin", "Android", "Maps API"], link: null },
        { title: "Pomodoro Blocker", body: "A Chrome extension combining Pomodoro timers and site blocking to maximize focus.", tags: ["JavaScript", "Chrome Extension"], link: { label: "Qiita →", url: "https://qiita.com/yasu_qita/items/1a26adb8dff47c402d8e" } },
      ],
    },
    stack: {
      title: "Language & Stack",
      sub: "A practical stack spanning research code and production systems.",
    },
    beyond: {
      title: "Beyond Engineering",
      sub: "The person behind the researcher and engineer.",
      items: [
        { icon: "🎵", title: "Bass Clarinet", body: "Playing bass clarinet since middle school. Member of the Kitano High School Alumni Wind Orchestra.", link: null },
        { icon: "🏃", title: "Marathon", body: "Completed the Shimonoseki Kaikyo Marathon 2025 — full 42.195 km.", link: null },
        { icon: "✍️", title: "Tech Writing", body: "Writing technical articles on AI, parallel processing, Chrome extensions, and more.", link: { label: "View on Qiita →", url: "https://qiita.com/yasu_qita" } },
      ],
    },
    contact: {
      title: "Contact",
      sub: "Open to research collaboration, engineering projects, and career inquiries.",
    },
  },
} as const;

export const researchData = {
  awards: [
    {
      type: "Award",
      title: "Best Presentation Award",
      meta: "Kyoto University Joint-Symposium on Mechanics of Advanced Materials & Structures 2025 · Nov 2025",
    },
    {
      type: "Scholarship",
      titleJa: "京都大学 BOOST 次世代 AI 奨学金",
      titleEn: "Kyoto University BOOST Next-Generation AI Scholarship",
      meta: "Kyoto University BOOST — Next Generation AI Scholarship",
    },
  ],
  papers: [
    {
      title: "Engineering cleavage fracture of silicon via excess charge doping",
      authors: "Tao Xu, Shodai Nakai, <b>Yasuaki Maruyama</b>, Hiroki Noda, Susumu Minami, Hiroyuki Hirakata, Takahiro Shimada",
      journal: "Engineering Fracture Mechanics 331, 111721",
      year: "2026",
    },
    {
      titleJa: "能動的機械学習とハイスループット第一原理計算によるデータ駆動型非線形強誘電物性のひずみ最適化",
      titleEn: "Data-driven strain optimization of nonlinear ferroelectric properties via active ML and high-throughput DFT",
      authors: "見波将, <b>丸山泰明</b>, 阿部能将, 仲山智裕, 嶋田隆広",
      journal: "日本機械学会論文集 91巻 941号 24-00184",
      year: "2025",
    },
  ],
  conferences: [
    {
      type: "International · Poster",
      title: "First-principles based six-dimensional strain engineering via active machine learning for ferroelectric PbTiO₃",
      authors: "Yasuaki Maruyama*, Susumu Minami, Takahiro Shimada",
      venue: "KU Joint-Symposium on Mechanics of Advanced Materials & Structures 2025",
      date: "Nov 2025",
      award: true,
    },
    {
      type: "International · Poster",
      title: "Strain engineering of electronic band structure through active machine learning and first-principles",
      authors: "Yasuaki Maruyama, Susumu Minami, Takahiro Shimada",
      venue: "10th Symposium for Multiscale Materials Mechanics",
      date: "Jun 2025",
      award: false,
    },
    {
      type: "Domestic · Oral",
      titleJa: "能動的機械学習とハイスループット第一原理計算を用いた圧電機能に関するデータ駆動型ひずみ最適化技術開発",
      titleEn: "Data-driven strain optimization of piezoelectric functions via active ML and high-throughput DFT",
      authors: "○丸山泰明, 阿部能将, 仲山智裕, 見波将, 嶋田隆広",
      venue: "第37回計算力学講演会 (CMD2024)",
      date: "Oct 2024",
      award: false,
    },
    {
      type: "Domestic · Poster",
      titleJa: "ベイズ的能動学習によるバンド構造の第一原理ひずみ設計手法開発",
      titleEn: "First-principles strain design of band structure via Bayesian active learning",
      authors: "丸山泰明*, 見波将, 嶋田隆広",
      venue: "日本物理学会 第80回年次大会 · 広島大学",
      date: "2025",
      award: false,
    },
    {
      type: "Domestic · Poster",
      titleJa: "機械学習とハイスループット第一原理計算によるデータ駆動型物性予測技術開発と強誘電体機能のひずみ最適化への応用",
      titleEn: "ML and high-throughput DFT for data-driven property prediction and strain optimization of ferroelectric functions",
      authors: "○丸山泰明, 阿部能将, 仲山智裕, 見波将, 嶋田隆広",
      venue: "第9回マルチスケール材料力学シンポジウム",
      date: "May 2024",
      award: false,
    },
  ],
};

export const stackData = [
  { category: "Languages", items: ["Python", "TypeScript", "Ruby", "Kotlin", "JavaScript"] },
  { category: "ML / AI", items: ["PyTorch", "scikit-learn", "Active Learning", "LLM", "RAG"] },
  { category: "Web / Infra", items: ["Next.js", "Rails", "AWS", "Docker", "PostgreSQL"] },
  { category: "Research", items: ["First-principles DFT", "Materials Informatics", "Bayesian Opt"] },
];
