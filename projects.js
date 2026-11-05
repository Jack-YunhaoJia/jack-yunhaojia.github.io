window.PROJECTS = [
  {
    "id": "cosmic",
    "num": "01",
    "year": "2022—2024",
    "type": "无障碍乐器设计 · 听触人因研究",
    "title": "Cosmic-R",
    "name": "Cosmic-R",
    "summary": "面向视障人群的数字乐器设计，并通过本科论文深化触觉、声音与动作之间的映射研究。",
    "image": "assets/cosmic-live-cover.jpg",
    "imageAlt": "Cosmic-R 演奏实拍，双手操作环形与点状金属触摸界面",
    "tags": [
      "人因研究",
      "无障碍交互",
      "声音设计",
      "交互原型"
    ],
    "role": "团队装置中的声音与交互设计、Arduino / Max 系统开发；后续本科论文作者。",
    "question": "不依赖视觉，使用者如何通过纹理理解操作，并听到与动作相呼应的声音？",
    "methods": [],
    "findings": [],
    "outcome": "三代原型、声音与交互系统，以及2024年本科毕业论文。",
    "limit": "小样本定性探索，不将设计目标等同于已测得的效率或认知负荷改善。",
    "evidence": [
      [
        "Cosmic-R 文字报告",
        "assets/docs/cosmic-report.pdf"
      ],
      [
        "本科毕业论文",
        "assets/docs/cosmic-thesis.pdf"
      ]
    ],
    "figures": [
      "assets/cosmic-v1-prototype.png",
      "assets/cosmic-v1-concept.png",
      "assets/cosmic-v3-performance.png"
    ],
    "captions": [
      "V1 / Cosmic-R · 多种输入｜作品集第 10 页",
      "V1 / 造型与界面概念图｜作品集第 9 页",
      "V3 / 金石锁阵 · 无线与合奏｜作品集第 10 页"
    ]
  },
  {
    "id": "evaluation",
    "num": "02",
    "year": "校企合作研究",
    "type": "智能座舱 · 人因与用户体验研究",
    "title": "华为问界 M9 音乐视觉通感技术研究",
    "name": "华为问界M9音乐视觉通感技术研究",
    "summary": "围绕智能座舱的音乐与视觉融合体验，结合专家访谈、问卷设计与用户体验研究，将专业概念转化为可研究、可讨论的体验问题。",
    "image": "assets/m9-cover.png",
    "imageAlt": "用户提供的问界M9座舱音响与视觉界面图片",
    "tags": [
      "人因实验设计",
      "专家访谈",
      "用户访谈",
      "问卷设计"
    ],
    "role": "参与校企合作研究，围绕研究梳理、访谈与问卷、体验评价方案及用户反馈分析开展工作。",
    "question": "如何以人的感知与使用体验为起点，建立跨感官座舱体验的研究与评价思路？",
    "methods": [],
    "findings": [],
    "outcome": "研究框架、访谈与问卷材料、体验评价方案及研究报告。",
    "limit": "本案例展示研究方法与实验设计，具体评价结果、车型对比结论及技术参数不公开。",
    "evidence": [],
    "figures": [],
    "captions": []
  },
  {
    "id": "micro",
    "num": "03",
    "year": "2025",
    "type": "联合发表 · 情感计算",
    "title": "让音乐，回应当下的情绪",
    "name": "微表情 / 闭环音乐生成系统",
    "summary": "联合发表研究：连接微表情识别、音乐生成和用户反馈，探索动态情绪适配。",
    "image": "assets/micro-7-0.jpg",
    "imageAlt": "McGE 2025 论文中的用户研究流程原图",
    "tags": [
      "实验设计",
      "音乐体验评价",
      "情感计算"
    ],
    "role": "论文第二作者（Yunhao Jia），负责音乐侧工作与实验设计。",
    "question": "当用户情绪在连续聆听中变化时，动态闭环音乐生成相较于静态音乐库，会如何影响情绪体验、音乐质量评价与系统偏好？",
    "methods": [
      [
        "系统与音乐逻辑",
        "情绪识别与音乐生成并行进行，通过Align-Net对齐图像特征和音乐描述，以MusicLDM生成后续音乐。"
      ],
      [
        "参与者内对照",
        "10位参与者均体验动态闭环和静态音乐库，两种条件同样基于MusicLDM提供音乐。"
      ],
      [
        "五轮连续体验",
        "从真实音乐开始，逐轮采集图像、识别情绪、生成音乐，并收集参与者当轮自报。"
      ],
      [
        "分维度评价",
        "分别记录情绪改善、音乐质量、真实与生成音乐可区分性，以及完成两种系统后的偏好。"
      ]
    ],
    "findings": [
      [
        "情绪体验与音质分别分析",
        "情绪改善均值为4.2与3.1，音乐质量均值为3.6与3.4；分别考察适配方式、音乐内容与音质对体验的作用。"
      ],
      [
        "结合连续轨迹与最终选择",
        "对照五轮情绪自报的变化与结束评价，9/10参与者选择动态闭环。"
      ],
      [
        "识别误差是设计线索",
        "测试集准确率54.6%，体验阶段平均准确率53.1%；将模型预测与用户自报交叉理解。"
      ]
    ],
    "outcome": "发表于 McGE ’25（ACM，2025）：Precision Emotion Regulation for Mood Disorders: A Micro-Expression-Based Closed-Loop Music Therapy System。",
    "limit": "这是小样本系统可行性探索。未在本版核验原始数据与显著性；随机化、平衡顺序等细节需补充。网页不将论文结果扩展为临床疗效或适用于所有人的结论。",
    "evidence": [
      [
        "ACM 论文 · 本地阅读",
        "assets/docs/micro-paper.pdf"
      ]
    ],
    "figures": [
      "assets/micro-6-0.jpg"
    ],
    "captions": [
      "音乐生成模块架构｜McGE ’25 论文原图"
    ],
    "paperTitle": "Precision Emotion Regulation for Mood Disorders: A Micro-Expression-Based Closed-Loop Music Therapy System",
    "hideBoundary": true
  },
  {
    "id": "annotation",
    "num": "04",
    "year": "2025",
    "type": "视听体验 · 方案比较 · AI配乐评价",
    "title": "HUAWEI Schubert",
    "name": "HUAWEI Schubert项目",
    "summary": "围绕图像与视频配乐体验，结合方案比较、用户分层和音乐专业分析，研究配乐为什么匹配，以及如何进一步改进。",
    "image": "assets/schubert/cover.png",
    "imageAlt": "HUAWEI Schubert视频配乐评价中的海滩素材画面",
    "tags": [
      "用户体验评价",
      "方案比较",
      "年龄分层",
      "视听匹配"
    ],
    "role": "参与配乐体验评价、实验结果分析与案例诊断，将用户反馈和音乐专业判断转化为体验问题与改进建议。",
    "question": "同一视觉内容配上不同音乐时，如何评价匹配体验，并解释不同用户的判断？",
    "methods": [],
    "findings": [],
    "outcome": "配乐方案对照评价、用户分层与内容语境分析，以及视频适配探索和后续评价实验思路。",
    "limit": "案例分析用于解释具体素材中的体验差异；后续评价实验围绕音乐、情绪与交互三个层面扩展。",
    "evidence": [],
    "figures": [],
    "captions": []
  },
  {
    "id": "river",
    "num": "05",
    "year": "2026",
    "type": "网络声音交互装置 · 生成声景 · 交互地图",
    "title": "音流·溯城",
    "name": "音流·溯城 · River",
    "summary": "一条由声音构筑的流动场域。让个人留声沿上海水系漂流，在时间与河段中风化，与城市声景交织。",
    "tags": [
      "声音交互",
      "体验叙事",
      "空间聆听",
      "响应式界面"
    ],
    "role": "声音交互与体验设计案例",
    "image": "assets/river/01.png",
    "imageAlt": "音流·溯城首页，液态字标叠映上海水系",
    "question": "如何让个人记忆的留下、相遇与遗忘，成为可以聆听和观看的过程？",
    "methods": [],
    "findings": [],
    "outcome": "作品介绍与九张界面截图。",
    "limit": "本页为设计展示，截图中的声点与人数不代表线上活动数据。",
    "evidence": [
      [
        "作品介绍原文",
        "assets/docs/river-introduction.txt"
      ]
    ],
    "figures": [
      "assets/river/08.png"
    ],
    "captions": [
      "声点聆听与风化波形｜原项目截图"
    ]
  },
  {
    "id": "tuning",
    "num": "06",
    "year": "2023—2026",
    "type": "交互平台 · 论文与发明专利",
    "title": "让抽象的律学，变得可听",
    "name": "中国古代乐律 / 计算与可听化",
    "summary": "把古籍中的数理关系转为可操作、可视、可听的交互平台，连接知识与体验。",
    "image": "assets/tuning-2-0.jpg",
    "imageAlt": "中国古代乐律计算及可听化平台三百六十律界面",
    "tags": [
      "信息表达",
      "Max/MSP",
      "授权发明专利"
    ],
    "role": "平台团队成员、论文共同作者、专利共同发明人及专利权人。具体模块的个人分工待进一步补充。",
    "question": "如何帮助学习者从公式和史料进入音律关系的交互理解？",
    "methods": [
      [
        "计算与交互",
        "以 Max/MSP 实现古代律制的数理推导、参数输入与结果显示。"
      ],
      [
        "多感官表达",
        "将律学计算与频率、声音演示连接，按历史脉络组织律制模块。"
      ],
      [
        "成果证据",
        "《复旦学报（自然科学版）》2024 年论文；发明专利 ZL 2023 1 0315223.6，授权公告日为 2026 年 10 月 9 日。"
      ]
    ],
    "findings": [
      [
        "从一次计算走向可探索的系统",
        "用户可以输入初始数值、调取计算结果，并通过声音感受不同律制的关系。"
      ],
      [
        "抽象知识的呈现需要多种通道",
        "可视化推导与可听化输出共同支撑平台的教学和科普设计意图。"
      ]
    ],
    "outcome": "",
    "limit": "论文与专利证明平台实现和授权记录，不直接证明学习效果提升。当前材料未核实正式用户测试；不包装为已验证的教育干预。",
    "evidence": [
      [
        "期刊论文",
        "assets/docs/tuning-paper.pdf"
      ],
      [
        "发明专利证书",
        "assets/docs/patent.pdf"
      ]
    ],
    "figures": [],
    "captions": [],
    "paperTitle": "基于 Max/MSP 的中国古代乐律计算及可听化平台搭建",
    "patentTitle": "一种基于中国古代律学的音律计算发声显示方法及系统",
    "hideBoundary": true,
    "outcomeFigures": [
      {
        "src": "assets/tuning-patent-certificate.png",
        "alt": "发明专利证书：一种基于中国古代律学的音律计算发声显示方法及系统",
        "caption": "发明专利证书",
        "href": "assets/docs/patent.pdf"
      },
      {
        "src": "assets/tuning-paper-first-page.png",
        "alt": "论文首页：基于 Max/MSP 的中国古代乐律计算及可听化平台搭建",
        "caption": "期刊论文",
        "href": "assets/docs/tuning-paper.pdf"
      }
    ]
  }
];
