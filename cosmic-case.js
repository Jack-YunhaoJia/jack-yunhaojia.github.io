'use strict';
// Source-backed case: 2022 project report + Jia Yunhao's 2024 undergraduate thesis.
function cosmicCaseHTML(visual,thumbs){
 const mappings=[['长条曲线','带有颤音的长音'],['圆圈 / 空洞','带有空间混响或空间性音响特征的声音'],['由宽到窄的三角形','响度或声部复杂程度逐渐降低'],['点状 / 粗糙表面','杂音相对较多、听感干涩的音色'],['平滑表面','丰满、和谐的音色'],['多线条交织 / 网状','复杂的声部'],['尖刺状凸起','高频噪音较多、刺耳的声音']];
 const steps=[['触觉激活','先触摸，再描述','探索不同材质、纹理与操作部件，首次 1 分钟，交换后 30 秒；记录找到交互方式的快 / 中 / 慢等级。'],['听觉激活','把听到的感受说出来','聆听音乐与音色，分别引导情境想象和织体描述，观察参与者实际使用的表达方式。'],['动作联动','用动作回应音乐','让参与者自由选择点击、弹拨、滚动、挥舞等动作，记录动作与节奏、旋律、音色之间的关联。'],['粘土共创','把声音变成可触摸的形态','视障与健视参与者配对，轮流塑形并接续创作，用实体模型表达难以口述的声音体验。'],['分享与反向探索','从纹理重新回到声音','访谈创作意图，再触摸自己的作品并以声音模仿，交叉理解口述、动作与塑形的含义。']];
 return visual+thumbs+`<div class="case-research cosmic-research" id="case-research" data-case-section="research"><article class="reading-wrap cosmic-page">
 <header class="cosmic-intro">
  <p class="label">CASE 01 / ACCESSIBLE INSTRUMENT · 2022—2024</p>
  <h1 id="sheet-title">Cosmic-R</h1>
  <p class="cosmic-subtitle">面向视障人群的新型数字乐器设计</p>
  <p class="cosmic-lead">让手指探索纹理，让身体表达音乐。<br>从一件无障碍乐器出发，进一步研究人如何理解触觉、声音与动作之间的关系。</p>
  <div class="method-tags"><span>人因研究</span><span>无障碍交互</span><span>听触映射</span><span>声音设计</span><span>交互原型</span></div>
 </header>
 <div class="cosmic-glance" aria-label="项目概览">
  <div><strong>10<span>人</span></strong><p>论文工作坊参与者<br>5 位视障 · 5 位健视</p></div>
  <div><strong>7<span>类</span></strong><p>纹理与声音映射线索<br>来自塑形与访谈归纳</p></div>
  <div><strong>3<span>代</span></strong><p>交互原型探索<br>实体输入 · 舞台 · 无线</p></div>
 </div>
 <div class="cosmic-credits">
  <div><p class="label">MY CONTRIBUTION / 我的工作</p><p>声音与交互设计、Arduino 传感数据读取与处理、Max/MSP 声音系统开发及舞台适配；后续以本科论文作者身份，展开听触关联的探索性研究与设计总结。</p></div>
  <div><p class="label">COLLABORATION / 团队协作</p><p>装置由跨专业团队共同设计。设计团队：金希尧、贾云皓、徐逸雪、江炜韬、刘兆蕤。<br>本科论文作者：贾云皓；指导教师：秦毅。</p></div>
 </div>
 <nav class="cosmic-nav" aria-label="Cosmic-R 内容导航">${[['cosmic-origin','项目起点'],['cosmic-study','人因研究'],['cosmic-insights','研究发现'],['cosmic-design','设计转化'],['cosmic-iterations','原型迭代'],['cosmic-results','成果与反思']].map(([id,t])=>`<button data-case-target="${id}">${t}</button>`).join('')}</nav>

 <section class="cosmic-section" id="cosmic-origin">
  <div class="cosmic-section-head"><p class="label">01 / ORIGIN</p><h2>从音乐探索的障碍，<br>到触觉交互的可能。</h2></div>
  <div class="cosmic-prose"><p>传统数字乐器往往依赖视觉定位、复杂控制面板与预先训练。对视障使用者而言，找到控件、理解功能并将动作与声音建立联系，会成为探索音乐时的障碍。</p><p>Cosmic-R 将抽象的声音调制，转化为触摸、敲击、按压、摩擦等具身动作。界面以大小、疏密、起伏不同的纹理提示操作可能性，并以“星空”组织形态与音乐体验；R 为 Ray 的缩写，寄托探索“宇宙之音”的想象。</p></div>
  <blockquote class="cosmic-question">不依赖视觉，界面能否让使用者通过触摸理解“可以怎样演奏”，并听到与动作相呼应的声音？</blockquote>
  <div class="cosmic-stages"><article><p class="label">2022 / 项目设计</p><h3>做出可以演奏的乐器</h3><p>团队提出纹理示能性与声音隐喻的设计构想，集成实体界面、传感器和实时声音系统。文字报告进一步提出可用性、便携性与声音映射的研究方向。</p></article><article><p class="label">2024 / 本科论文</p><h3>追问交互为什么能被理解</h3><p>沿着项目提出的问题，以工作坊、访谈、行为观察与粘土共创研究触觉—声音关系，并结合三代装置梳理声音设计及技术实现。</p></article></div>
  
 </section>

 <section class="cosmic-section" id="cosmic-study">
  <div class="cosmic-section-head"><p class="label">02 / HUMAN FACTORS STUDY</p><h2>把感官体验，<br>变成可以观察与讨论的材料。</h2></div>
  <div class="cosmic-study-brief"><div><h3>研究对象</h3><p>10 位参与者：5 位视障人士（4 位全盲、1 位弱视）与 5 位健视人士。均接受过基础音乐训练，听力健康，能够完成任务与表达反馈。</p></div><div><h3>研究关注</h3><p>如何发现操作方式；如何描述声音和触感；哪些动作与声音自然关联；不同感知经验如何影响纹理理解。</p></div></div>
  <ol class="cosmic-process">${steps.map(([t,h,p],i)=>`<li><span class="cosmic-step">0${i+1}</span><div><p class="label">${t}</p><h3>${h}</h3><p>${p}</p></div></li>`).join('')}</ol>
  <div class="cosmic-control"><h3>让任务可比较，也保留真实表达</h3><p>健视参与者在相关环节佩戴眼罩；音频统一为 44.1 kHz / 16 bit 立体声，并预先处理响度，尽量保持一致。全程录音录像并取得研究使用授权，将口述、行为记录和塑形结果相互参照。</p><p>蒙眼用于控制当下的视觉输入，不能代替视障者长期形成的感知经验。记录的快 / 中 / 慢是观察等级，未设置秒级阈值。</p></div>
  
 </section>

 <section class="cosmic-section" id="cosmic-insights">
  <div class="cosmic-section-head"><p class="label">03 / INSIGHTS → DECISIONS</p><h2>研究的价值，<br>落在具体的设计选择里。</h2></div>
  <div class="cosmic-insights">
   <article><span class="cosmic-insight-number">01</span><h3>操作复杂度，不等于理解难度</h3><p>触摸记录中，拇指琴等包含多个部件的材料也能较快引出操作。访谈提示：熟悉的用途与部件排布可能帮助参与者理解界面。</p><div><b>设计启示</b><p>优先让纹理和形态提示动作，让控制分组清晰，而非仅按控件数量判断设计难度。</p></div></article>
   <article><span class="cosmic-insight-number">02</span><h3>同一声音，可能先唤起不同故事</h3><p>海浪素材被塑形成沙滩、海浪与赤足；听觉激活中，参与者更多讲述情感和个人经历，未按预期集中描述声音织体。</p><div><b>设计转化</b><p>声音语义会影响映射理解。装置声音设计更多采用抽象电子音色，减少具体声源故事对纹理感知的干扰。</p></div></article>
   <article><span class="cosmic-insight-number">03</span><h3>动作让抽象音乐获得身体线索</h3><p>敲击与点击常回应节奏；弹拨回应发声方式；滚动、挥舞和摇杆运动则用于表达旋律线条或情绪动态。</p><div><b>设计转化</b><p>将离散触发与连续调制分开组织：点状输入触发短音，条状与连续操作表达线性变化，保留多种音乐表达路径。</p></div></article>
   <article><span class="cosmic-insight-number">04</span><h3>感知描述，需要由多种材料共同解释</h3><p>视障参与者更多描述触感、形状与材质，部分健视参与者先说物品名称或用途；部分视障参与者还会敲击物体，以声音辅助判断材质。</p><div><b>设计启示</b><p>将触觉与听觉作为相互支持的通道，并结合动作和塑形解释访谈，避免仅凭设计者的视觉联想决定声音。</p></div></article>
  </div>
  
 </section>

 <section class="cosmic-section" id="cosmic-design">
  <div class="cosmic-section-head"><p class="label">04 / FROM PERCEPTION TO DESIGN</p><h2>把触感的语言，<br>写进声音与交互。</h2></div>
  <p class="cosmic-prose">结合参与者的塑形解释、访谈反馈与研究者补充，论文归纳了 7 类纹理与声音特征的映射线索。它们为声音设计提供依据，仍需要在更细化的任务中继续验证。</p>
  <div class="cosmic-mapping"><table><caption>触觉纹理与声音特征的映射线索</caption><thead><tr><th scope="col">触觉形态</th><th scope="col">声音特征</th></tr></thead><tbody>${mappings.map(([t,s])=>`<tr><th scope="row">${t}</th><td>${s}</td></tr>`).join('')}</tbody></table></div>
  
  <figure class="cosmic-figure cosmic-design-figure"><img src="assets/cosmic-v1-concept.png" alt="Cosmic-R V1 造型与触觉界面概念图" loading="lazy"><figcaption>V1 / 造型与界面概念图｜人因工程与实验作品集第 9 页。</figcaption></figure>
  <div class="cosmic-translations"><article><p class="label">LINE / 连续线条</p><h3>条状触摸 → Lead 与弯音</h3><p>将长条纹理与连续的单音 Lead 绑定，形状宽窄对应 Pitch Bend，让触摸路径与音高变化形成联系。</p></article><article><p class="label">POINT / 离散触发</p><h3>点状触摸 → 短起音</h3><p>点状传感器绑定 Attack 较短的打击类音色；敲击信号经过共鸣器与效果器处理，回应触点的打击动作。</p></article><article><p class="label">CIRCLE / 渐变反馈</p><h3>环状触摸 → 生成性音色</h3><p>大面积圆圈状输入绑定 Pad 或 Lead，根据电容传感输入产生渐变听感，让探索动作获得持续反馈。</p></article></div>
  <div class="cosmic-system"><div><p class="label">SYSTEM / 交互实现</p><h3>从身体动作到实时声音的完整链路</h3><p>在软件中解析、分配和映射输入，让交互概念落实为可演奏的声音反馈。初期方案集成近 50 个电容触点、2 枚压力传感器、十多枚压电陶瓷振动传感器和 Joystick。</p></div><ol><li><b>动作输入</b><span>触摸 / 按压 / 敲击</span></li><li><b>信号采集</b><span>传感数据 / 振动音频</span></li><li><b>解析与映射</b><span>Max/MSP · 串口 / OSC / MIDI</span></li><li><b>声音反馈</b><span>Ableton Live · 音符触发与音色调制</span></li></ol><p class="cosmic-source">流程依据原报告与论文整理。压电振动信号通过声卡进入声音链路，不全部经过 Arduino。</p></div>
 </section>

 <section class="cosmic-section" id="cosmic-iterations">
  <div class="cosmic-section-head"><p class="label">05 / PROTOTYPING & ITERATION</p><h2>在不同使用情境里，<br>重新取舍交互。</h2></div>
  <div class="cosmic-versions">
   <article><header><span>1.0</span><h3>探索多种输入可能</h3></header><p><b>要解决的问题</b>让触摸、压力、敲击和摇杆形成可演奏的声音控制。</p><p><b>我的实现</b>读取与整理传感数据，以触摸触发音符、压力控制数据开关、摇杆切换音色及调制效果；在 Max 中分配控制与音高信息。</p><p><b>关键取舍</b>技术测试未达预期时重组压力与控制逻辑；摇杆使用 fluid. 库学习多参数映射，以二维输入控制效果器参数。</p></article>
   <article><header><span>2.0</span><h3>围绕舞台简化与重构</h3></header><p><b>要解决的问题</b>现场展演要求稳定的数据传递、明确的模式切换和可维护的程序。</p><p><b>我的实现</b>适配移除压力与摇杆后的输入，用侧面电容键切换乐章与控制；重构 Max 主程序、子程序数据接收与串口划分。</p><p><b>声音设计</b>以三种声音模式组织神秘、冲突与明亮的舞台段落，并用秒表音效串联宇宙与时间主题。</p></article>
   <article><header><span>3.0</span><h3>探索无线与组合动作</h3></header><p><b>要解决的问题</b>体积与有线连接限制了操作和演奏的自由度。</p><p><b>我的实现</b>适配无线传感数据，将表面触摸与六轴运动数据组合，用触摸选择声音组合，以转动进一步触发或调制声音。</p><p><b>交互探索</b>在六面体结构中引入近似手摇铃铛的动作反馈，并探索 2.0 与 3.0 装置合奏。</p></article>
  </div>
  <div class="cosmic-photos"><figure class="cosmic-figure"><img src="assets/cosmic-v1-prototype.png" alt="Cosmic-R V1 实体原型与电脑连接的现场照片" loading="lazy"><figcaption>V1 / Cosmic-R · 多种输入｜作品集第 10 页。</figcaption></figure><figure class="cosmic-figure"><img src="assets/cosmic-v2-prototype.png" alt="Cosmic-R V2 原型，展示环形及点状金属电容触点" loading="lazy"><figcaption>V2 / Cosmic-R · 舞台简化｜作品集第 10 页。</figcaption></figure><figure class="cosmic-figure"><img src="assets/cosmic-v3-performance.png" alt="V3 金石锁阵的舞台演出与投影画面" loading="lazy"><figcaption>V3 / 金石锁阵 · 无线与合奏｜作品集第 10 页。</figcaption></figure></div>
  
 </section>

 <section class="cosmic-section" id="cosmic-results">
  <div class="cosmic-section-head"><p class="label">06 / OUTCOMES & REFLECTION</p><h2>一件作品，<br>也是继续研究的起点。</h2></div>
  <div class="cosmic-outcomes"><article><h3>设计产出</h3><p>团队完成纹理化实体界面与可演奏的数字乐器，经历三代输入与场景探索；我的声音与软件工作连接了实体操作、传感数据和音乐表达。</p></article><article><h3>研究产出</h3><p>将项目后续的听触关系研究整理为本科毕业论文：<cite>《触觉感知与声音设计：面向视障人群的无障碍乐器界面设计与研究》</cite>，2024 年 4 月完成。</p></article><article><h3>方法积累</h3><p>从人的感知与行为提出问题，通过访谈、观察和共创收集线索，再将研究结论转译成声音规则与可运行原型，形成跨越研究、设计与实现的工作方式。</p></article></div>
  <details class="cosmic-reflection"><summary>研究反思与下一步验证</summary><div><p><b>样本与记录：</b>这是 10 位有基础音乐训练参与者的小样本探索，不能直接推广至所有视障使用者。方案描述为两两配对，但部分塑形结果仅列 4 组；现有材料未解释缺失情况，因此不据此计算覆盖率。</p><p><b>任务与测量：</b>三代原型的迭代尚不能证明使用效率或认知负荷改善。快 / 中 / 慢未定义秒级阈值，音频、材料与生活经验可能共同影响结果；开放讨论和引导也可能改变表达。反向模仿自己的作品仍受记忆影响，不能作为独立的识别验证。</p><p><b>后续研究：</b>可控制单一纹理与声音变量，采用顺序平衡的匹配任务，记录首次成功、错误类型、学习时间与主观负荷；再通过长期使用观察，检验映射是否容易学习、记忆并用于音乐表达。以上是下一步计划，尚未作为已完成成果呈现。</p></div></details>
 </section>

 <section class="cosmic-section cosmic-evidence"><div class="cosmic-section-head"><p class="label">SOURCE MATERIALS</p><h2>项目与研究原文</h2></div><div class="cosmic-docs"><a href="assets/docs/cosmic-report.pdf" target="_blank" rel="noopener"><span class="label">PROJECT REPORT / 4 PAGES</span><h3>Cosmic-R 文字报告</h3><p>团队设计思路、纹理概念、技术路线与未来工作。</p><span>阅读项目报告 PDF ↗</span></a><a href="assets/docs/cosmic-thesis.pdf" target="_blank" rel="noopener"><span class="label">UNDERGRADUATE THESIS / 2024</span><h3>本科毕业论文</h3><p>实验设计、行为与访谈记录、映射归纳、声音及软件实现。</p><span>阅读本科毕业论文 PDF ↗</span></a></div></section>
 <footer class="reader-end"><a href="#">返回作品集</a><button data-next-project="evaluation">下一个研究 / 问界 M9</button></footer>
 </article></div>`;
}
