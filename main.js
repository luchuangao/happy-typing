const $ = (id) => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element: ${id}`);
  return el;
};

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const nowMs = () => performance.now();

const formatPct = (v) => `${Math.round(v * 100)}%`;

const formatSeconds = (s) => `${s.toFixed(1)}s`;

const toCpm = (correctChars, elapsedSeconds) => {
  if (elapsedSeconds <= 0) return 0;
  return Math.round((correctChars / elapsedSeconds) * 60);
};

const normalizeForMode = (modeKey, text) => {
  const raw = String(text ?? "");
  if (modeKey === "hanzi") return raw;
  if (modeKey === "pinyin") return raw.toLowerCase().replace(/\s+/g, " ");
  if (modeKey === "custom") return raw;
  if (modeKey === "course") return raw;
  return raw.toLowerCase();
};

const DIFFICULTY = {
  easy: { trackDistance: 1200, ai1: 18, ai2: 20 },
  normal: { trackDistance: 1500, ai1: 22, ai2: 24 },
  hard: { trackDistance: 1800, ai1: 26, ai2: 28 },
};

const EN_WORDS = [
  "about",
  "above",
  "across",
  "actor",
  "action",
  "active",
  "advice",
  "after",
  "again",
  "agent",
  "agree",
  "ahead",
  "album",
  "alive",
  "allow",
  "along",
  "already",
  "always",
  "amount",
  "animal",
  "answer",
  "anyone",
  "appear",
  "apply",
  "around",
  "artist",
  "attack",
  "author",
  "back",
  "balance",
  "basic",
  "beauty",
  "become",
  "before",
  "begin",
  "behind",
  "believe",
  "better",
  "beyond",
  "billion",
  "black",
  "blood",
  "board",
  "brain",
  "break",
  "bring",
  "build",
  "camera",
  "cancel",
  "capital",
  "career",
  "carry",
  "catch",
  "center",
  "chance",
  "change",
  "charge",
  "choice",
  "choose",
  "church",
  "circle",
  "class",
  "clear",
  "close",
  "coach",
  "color",
  "common",
  "company",
  "compare",
  "complex",
  "confirm",
  "connect",
  "control",
  "corner",
  "correct",
  "create",
  "credit",
  "culture",
  "danger",
  "decide",
  "define",
  "degree",
  "depend",
  "design",
  "detail",
  "develop",
  "doctor",
  "double",
  "during",
  "easily",
  "effect",
  "effort",
  "either",
  "energy",
  "enough",
  "enter",
  "escape",
  "estate",
  "except",
  "expert",
  "explain",
  "family",
  "famous",
  "fast",
  "father",
  "feature",
  "field",
  "fight",
  "figure",
  "finish",
  "focus",
  "follow",
  "force",
  "future",
  "garden",
  "general",
  "gentle",
  "global",
  "govern",
  "great",
  "ground",
  "growth",
  "handle",
  "happen",
  "health",
  "heart",
  "heavy",
  "helpful",
  "history",
  "honest",
  "hotel",
  "human",
  "impact",
  "improve",
  "include",
  "increase",
  "inside",
  "issue",
  "itself",
  "journey",
  "just",
  "keep",
  "knowledge",
  "language",
  "later",
  "leader",
  "learn",
  "level",
  "listen",
  "little",
  "local",
  "manage",
  "market",
  "matter",
  "memory",
  "method",
  "middle",
  "modern",
  "moment",
  "mother",
  "motion",
  "music",
  "nation",
  "natural",
  "nearby",
  "notice",
  "number",
  "object",
  "office",
  "often",
  "open",
  "option",
  "order",
  "owner",
  "paper",
  "parent",
  "people",
  "period",
  "person",
  "phone",
  "place",
  "plain",
  "player",
  "please",
  "policy",
  "power",
  "pretty",
  "price",
  "public",
  "quick",
  "quiet",
  "random",
  "reason",
  "record",
  "reduce",
  "remain",
  "repair",
  "report",
  "result",
  "return",
  "review",
  "right",
  "river",
  "school",
  "science",
  "screen",
  "search",
  "season",
  "secure",
  "select",
  "sense",
  "series",
  "service",
  "signal",
  "simple",
  "sister",
  "skill",
  "social",
  "speech",
  "spring",
  "stable",
  "start",
  "street",
  "strong",
  "studio",
  "success",
  "summer",
  "system",
  "table",
  "target",
  "teacher",
  "thanks",
  "theory",
  "thread",
  "today",
  "tomorrow",
  "travel",
  "treat",
  "true",
  "under",
  "update",
  "useful",
  "value",
  "victory",
  "video",
  "visit",
  "voice",
  "water",
  "window",
  "wonder",
  "world",
  "write",
];

const PINYIN = [
  "a",
  "ai",
  "an",
  "ang",
  "ao",
  "ba",
  "bai",
  "ban",
  "bang",
  "bao",
  "bei",
  "ben",
  "beng",
  "bi",
  "bian",
  "biao",
  "bie",
  "bin",
  "bing",
  "bo",
  "bu",
  "ca",
  "cai",
  "can",
  "cang",
  "cao",
  "ce",
  "cen",
  "ceng",
  "cha",
  "chai",
  "chan",
  "chang",
  "chao",
  "che",
  "chen",
  "cheng",
  "chi",
  "chong",
  "chou",
  "chu",
  "chuan",
  "chuang",
  "chui",
  "chun",
  "chuo",
  "ci",
  "cong",
  "cou",
  "cu",
  "cuan",
  "cui",
  "cun",
  "cuo",
  "da",
  "dai",
  "dan",
  "dang",
  "dao",
  "de",
  "dei",
  "den",
  "deng",
  "di",
  "dia",
  "dian",
  "diao",
  "die",
  "ding",
  "diu",
  "dong",
  "dou",
  "du",
  "duan",
  "dui",
  "dun",
  "duo",
  "e",
  "ei",
  "en",
  "eng",
  "er",
  "fa",
  "fan",
  "fang",
  "fei",
  "fen",
  "feng",
  "fo",
  "fou",
  "fu",
  "ga",
  "gai",
  "gan",
  "gang",
  "gao",
  "ge",
  "gei",
  "gen",
  "geng",
  "gong",
  "gou",
  "gu",
  "gua",
  "guai",
  "guan",
  "guang",
  "gui",
  "gun",
  "guo",
  "ha",
  "hai",
  "han",
  "hang",
  "hao",
  "he",
  "hei",
  "hen",
  "heng",
  "hong",
  "hou",
  "hu",
  "hua",
  "huai",
  "huan",
  "huang",
  "hui",
  "hun",
  "huo",
  "ji",
  "jia",
  "jian",
  "jiang",
  "jiao",
  "jie",
  "jin",
  "jing",
  "jiong",
  "jiu",
  "ju",
  "juan",
  "jue",
  "jun",
  "ka",
  "kai",
  "kan",
  "kang",
  "kao",
  "ke",
  "ken",
  "keng",
  "kong",
  "kou",
  "ku",
  "kua",
  "kuai",
  "kuan",
  "kuang",
  "kui",
  "kun",
  "kuo",
  "la",
  "lai",
  "lan",
  "lang",
  "lao",
  "le",
  "lei",
  "leng",
  "li",
  "lia",
  "lian",
  "liang",
  "liao",
  "lie",
  "lin",
  "ling",
  "liu",
  "long",
  "lou",
  "lu",
  "luan",
  "lue",
  "lun",
  "luo",
  "ma",
  "mai",
  "man",
  "mang",
  "mao",
  "me",
  "mei",
  "men",
  "meng",
  "mi",
  "mian",
  "miao",
  "mie",
  "min",
  "ming",
  "miu",
  "mo",
  "mou",
  "mu",
  "na",
  "nai",
  "nan",
  "nang",
  "nao",
  "ne",
  "nei",
  "nen",
  "neng",
  "ni",
  "nian",
  "niang",
  "niao",
  "nie",
  "nin",
  "ning",
  "niu",
  "nong",
  "nou",
  "nu",
  "nuan",
  "nue",
  "nun",
  "nuo",
  "o",
  "ou",
  "pa",
  "pai",
  "pan",
  "pang",
  "pao",
  "pei",
  "pen",
  "peng",
  "pi",
  "pian",
  "piao",
  "pie",
  "pin",
  "ping",
  "po",
  "pou",
  "pu",
  "qi",
  "qia",
  "qian",
  "qiang",
  "qiao",
  "qie",
  "qin",
  "qing",
  "qiong",
  "qiu",
  "qu",
  "quan",
  "que",
  "qun",
  "ran",
  "rang",
  "rao",
  "re",
  "ren",
  "reng",
  "ri",
  "rong",
  "rou",
  "ru",
  "ruan",
  "rui",
  "run",
  "ruo",
  "sa",
  "sai",
  "san",
  "sang",
  "sao",
  "se",
  "sen",
  "seng",
  "sha",
  "shai",
  "shan",
  "shang",
  "shao",
  "she",
  "shen",
  "sheng",
  "shi",
  "shou",
  "shu",
  "shua",
  "shuai",
  "shuan",
  "shuang",
  "shui",
  "shun",
  "shuo",
  "si",
  "song",
  "sou",
  "su",
  "suan",
  "sui",
  "sun",
  "suo",
  "ta",
  "tai",
  "tan",
  "tang",
  "tao",
  "te",
  "teng",
  "ti",
  "tian",
  "tiao",
  "tie",
  "ting",
  "tong",
  "tou",
  "tu",
  "tuan",
  "tui",
  "tun",
  "tuo",
  "wa",
  "wai",
  "wan",
  "wang",
  "wei",
  "wen",
  "weng",
  "wo",
  "wu",
  "xi",
  "xia",
  "xian",
  "xiang",
  "xiao",
  "xie",
  "xin",
  "xing",
  "xiong",
  "xiu",
  "xu",
  "xuan",
  "xue",
  "xun",
  "ya",
  "yan",
  "yang",
  "yao",
  "ye",
  "yi",
  "yin",
  "ying",
  "yo",
  "yong",
  "you",
  "yu",
  "yuan",
  "yue",
  "yun",
  "za",
  "zai",
  "zan",
  "zang",
  "zao",
  "ze",
  "zei",
  "zen",
  "zeng",
  "zha",
  "zhai",
  "zhan",
  "zhang",
  "zhao",
  "zhe",
  "zhen",
  "zheng",
  "zhi",
  "zhong",
  "zhou",
  "zhu",
  "zhua",
  "zhuai",
  "zhuan",
  "zhuang",
  "zhui",
  "zhun",
  "zhuo",
  "zi",
  "zong",
  "zou",
  "zu",
  "zuan",
  "zui",
  "zun",
  "zuo",
];

const HANZI = [
  "你",
  "我",
  "他",
  "她",
  "它",
  "们",
  "在",
  "是",
  "有",
  "不",
  "了",
  "和",
  "就",
  "都",
  "也",
  "很",
  "会",
  "要",
  "去",
  "来",
  "上",
  "下",
  "中",
  "大",
  "小",
  "多",
  "少",
  "好",
  "新",
  "老",
  "人",
  "天",
  "地",
  "水",
  "火",
  "风",
  "山",
  "海",
  "路",
  "车",
  "手",
  "心",
  "眼",
  "书",
  "字",
  "画",
  "声",
  "光",
  "电",
  "雨",
  "雪",
  "春",
  "夏",
  "秋",
  "冬",
  "早上",
  "晚上",
  "现在",
  "时候",
  "朋友",
  "谢谢",
  "加油",
  "比赛",
  "速度",
  "胜利",
  "努力",
  "坚持",
  "输入",
  "正确",
  "错误",
  "开始",
  "结束",
  "目标",
  "提示",
  "浏览器",
  "游戏",
  "打字",
  "赛车",
  "前进",
  "冲刺",
  "弯道",
  "赛道",
  "终点",
  "梦想",
  "未来",
  "学习",
  "进步",
  "简单",
  "困难",
  "普通",
  "快乐",
];

const MODE = {
  letters: {
    label: "字母",
    makeTokens(count) {
      const letters = "abcdefghijklmnopqrstuvwxyz";
      const out = [];
      for (let i = 0; i < count; i += 1) out.push(letters[Math.floor(Math.random() * letters.length)]);
      return out;
    },
    hint: "直接输入字母即可（自动跳到下一个）。",
  },
  english: {
    label: "英文",
    makeTokens: (count) => {
      const tokens = [];
      for (let i = 0; i < count; i++) tokens.push(pick(EN_WORDS));
      return tokens;
    },
    hint: "输入当前单词，匹配后自动进入下一个。",
  },
  pinyin: {
    label: "汉语拼音",
    makeTokens(count) {
      const out = [];
      for (let i = 0; i < count; i += 1) {
        const r = Math.random();
        if (r < 0.18) out.push(`${pick(PINYIN)} ${pick(PINYIN)}`);
        else out.push(pick(PINYIN));
      }
      return out;
    },
    hint: "不带声调；偶尔会出现两个音节，用空格隔开。",
  },
  hanzi: {
    label: "汉字",
    makeTokens: (count) => {
      const tokens = [];
      for (let i = 0; i < count; i++) tokens.push(pick(HANZI));
      return tokens;
    },
    hint: "可用中文输入法；候选上屏后匹配即算通过。",
  },
  custom: {
    label: "自定义",
    makeTokens: () => [],
    hint: "根据你输入的词语练习；用空格、逗号或换行分隔。",
  },
};

class RaceGame {
  constructor() {
    this.modeSelect = $("modeSelect");
    this.courseField = $("courseField");
    this.courseSelect = $("courseSelect");
    this.customField = $("customField");
    this.customInput = $("customInput");
    this.themeSelect = $("themeSelect");
    this.diffSelect = $("difficultySelect");
    this.sfxToggle = $("sfxToggle");
    this.voiceToggle = $("voiceToggle");
    this.startBtn = $("startBtn");
    this.resetBtn = $("resetBtn");
    this.restartBtn = $("restartBtn");
    this.trackCanvas = $("trackCanvas");
    this.input = $("typingInput");
    this.promptDone = $("promptDone");
    this.promptTodo = $("promptTodo");
    this.promptNext = $("promptNext");
    this.hintText = $("hintText");
    this.statusText = $("statusText");
    this.timeText = $("timeText");
    this.speedText = $("speedText");
    this.accText = $("accText");
    if (this.statusText) this.statusText.textContent = "待开始";
    this.resultCard = $("resultCard");
    this.resultText = $("resultText");
    this.keyboardEl = $("keyboard");

    this.ctx = this.trackCanvas.getContext("2d");
    if (!this.ctx) throw new Error("Canvas 2D context not available");

    this.audio = new AudioEngine();
    this.voice = new VoiceEngine();
    this.restoreSettings();
    this.sfxToggle.addEventListener("change", () => this.persistSettings());
    this.voiceToggle.addEventListener("change", () => this.persistSettings());

    this.dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());

    this.isComposing = false;
    this.input.addEventListener("compositionstart", () => {
      this.isComposing = true;
    });
    this.input.addEventListener("compositionend", () => {
      this.isComposing = false;
      this.handleTyping();
    });
    this.input.addEventListener("input", () => this.handleTyping());

    this.startBtn.addEventListener("click", () => this.start());
    if (this.resetBtn) this.resetBtn.addEventListener("click", () => this.reset());
    if (this.restartBtn) this.restartBtn.addEventListener("click", () => this.start());
    this.modeSelect.addEventListener("change", () => this.handleModeChange());
    if (this.zoneSelect) {
      this.zoneSelect.addEventListener("change", () => {
        if (this.modeSelect.value === "zones") {
          this.setupTokens();
          this.updatePrompt();
        }
        this.highlightKeyboard();
      });
    }
    this.courseSelect.addEventListener("change", () => {
      if (this.modeSelect.value !== "course") {
        this.modeSelect.value = "course";
        this.handleModeChange();
        return;
      }
      this.reset();
      this.highlightKeyboard();
    });
    this.customInput.addEventListener("input", () => {
      if (this.modeSelect.value !== "custom") {
        this.modeSelect.value = "custom";
        this.handleModeChange();
        return;
      }
      this.setupTokens();
      this.updatePrompt();
    });
    this.themeSelect.addEventListener("change", () => {
      if (this.state === "idle") this.render();
    });
    document.addEventListener("pointerdown", (e) => {
      const t = e.target;
      if (t && t instanceof HTMLElement) {
        if (t.closest("select")) return;
        if (t.id === "customInput") return;
      }
      if (this.state !== "finished") this.input.focus();
    });

    this.reset();
    this.buildKeyboard();
    this.render();
  }

  resizeCanvas() {
    const cssW = this.trackCanvas.clientWidth;
    const cssH = this.trackCanvas.clientHeight;
    const w = Math.max(1, Math.round(cssW * this.dpr));
    const h = Math.max(1, Math.round(cssH * this.dpr));
    if (this.trackCanvas.width !== w) this.trackCanvas.width = w;
    if (this.trackCanvas.height !== h) this.trackCanvas.height = h;
  }

  handleModeChange() {
    this.updateHint();
    const v = this.modeSelect.value;
    this.courseField.hidden = v !== "course";
    this.customField.hidden = v !== "custom";
    this.reset();
    this.buildKeyboard();
    this.highlightKeyboard();
  }

  reset() {
    this.state = "idle";
    this.tokens = [];
    this.tokenIndex = 0;
    this.currentTarget = "";
    this.maxMatchedInToken = 0;
    this.lastInputValue = "";
    this.correctChars = 0;
    this.totalTypedChars = 0;
    this.distance = 0;
    this.renderDistance = 0;
    this.ai1 = 0;
    this.ai2 = 0;
    this.lastFrameAt = 0;
    this.startedAt = 0;
    this.elapsedSec = 0;
    this.countdownUntil = 0;
    this.countdownValue = 0;
    this.unitDistancePerChar = 6;
    this.particles = [];
    if (this.resultCard) this.resultCard.hidden = true;

    this.input.value = "";
    this.input.classList.remove("is-error");
    this.input.disabled = false;
    this.setStatus("待开始");
    this.updateStats();
    this.setupTokens();
    this.updatePrompt();
    this.updateHint();
    this.highlightKeyboard();
  }

  setStatus(text) {
    if (this.statusText) this.statusText.textContent = text;
  }

  updateHint() {
    const modeKey = this.modeSelect.value;
    if (modeKey === "course") {
      this.hintText.textContent = "跟随课程内容练习；大小写与符号需严格匹配。";
      return;
    }
    const mode = MODE[modeKey];
    let extra = "";
    if (modeKey === "letters") extra = "（建议关闭中文输入法）";
    this.hintText.textContent = `${mode ? mode.hint : ""} ${extra}`;
  }

  setupTokens() {
    const modeKey = this.modeSelect.value;
    const mode = MODE[modeKey];
    if (modeKey === "course") {
      this.tokens = makeCourseTokens(this.courseSelect.value, 260);
    } else if (modeKey === "custom") {
      this.tokens = makeCustomTokens(this.customInput.value, 260);
    } else {
      this.tokens = mode.makeTokens(220);
    }
    this.tokenIndex = 0;
    this.currentTarget = this.tokens[0] ?? "";
  }

  updatePrompt() {
    const modeKey = this.modeSelect.value;
    const typed = normalizeForMode(modeKey, this.input.value ?? "");
    const target = normalizeForMode(modeKey, this.currentTarget ?? "");
    const safeTyped = typed.slice(0, target.length);

    let doneLen = 0;
    while (doneLen < safeTyped.length && target[doneLen] === safeTyped[doneLen]) doneLen += 1;

    const rawTarget = this.currentTarget ?? "";
    this.promptDone.textContent = rawTarget.slice(0, doneLen);
    this.promptTodo.textContent = rawTarget.slice(doneLen);

    const next = this.tokens.slice(this.tokenIndex + 1, this.tokenIndex + 7);
    const nextText = next.map((t) => t).join("  ");
    this.promptNext.textContent = nextText ? `接下来：${nextText}` : "";
    this.highlightKeyboard();
  }

  updateStats() {
    if (this.timeText) this.timeText.textContent = formatSeconds(this.elapsedSec);
    if (this.speedText) this.speedText.textContent = `${toCpm(this.correctChars, this.elapsedSec)} CPM`;
    const acc = this.totalTypedChars <= 0 ? 1 : this.correctChars / this.totalTypedChars;
    if (this.accText) this.accText.textContent = formatPct(clamp(acc, 0, 1));
  }

  start() {
    if (this.state === "running" || this.state === "countdown") return;
    this.reset();
    this.input.focus();
    this.audio.init();
    this.state = "countdown";
    this.startedAt = nowMs();
    this.countdownValue = 3;
    this.countdownUntil = this.startedAt + 3000;
    this.setStatus("倒计时 3...");
    if (this.voiceToggle.checked) this.voice.speak("三");
    if (this.sfxToggle.checked) this.audio.countBeep(3);
    this.lastFrameAt = 0;
    requestAnimationFrame((t) => this.frame(t));
  }

  finish(winner) {
    if (this.state === "finished") return;
    this.state = "finished";
    this.input.disabled = true;
    const acc = this.totalTypedChars <= 0 ? 1 : this.correctChars / this.totalTypedChars;
    const cpm = toCpm(this.correctChars, this.elapsedSec);

    const timeText = formatSeconds(this.elapsedSec);
    const speedText = `${cpm} CPM`;
    const accText = formatPct(clamp(acc, 0, 1));
    const lines = [
      `用时：${timeText}   速度：${speedText}   准确率：${accText}`,
      `结果：${winner === "you" ? "你赢了 🎉" : winner === "ai1" ? "小明 赢了 🤖" : "小红 赢了 🤖"}`,
    ];
    if (this.resultText) this.resultText.textContent = lines.join("\n");
    if (this.resultCard) this.resultCard.hidden = false;
    this.setStatus("已结束");
    if (winner === "you") {
      this.spawnConfetti(winner);
      if (this.voiceToggle.checked) this.voice.speak("你赢了，太棒了");
      if (this.sfxToggle.checked) this.audio.fanfare(winner);
    } else {
      if (this.voiceToggle.checked) this.voice.speak("比赛结束，继续加油");
      if (this.sfxToggle.checked) this.audio.fanfare(winner);
    }
  }

  handleTyping() {
    if (this.state !== "running") {
      this.updatePrompt();
      return;
    }
    if (this.isComposing) return;

    const modeKey = this.modeSelect.value;
    const targetRaw = this.currentTarget;
    const target =
      modeKey === "course" ? targetRaw : normalizeForMode(modeKey, targetRaw);

    const raw = this.input.value ?? "";
    let typed = modeKey === "course" ? raw : normalizeForMode(modeKey, raw);
    if (typed.length > target.length) typed = typed.slice(0, target.length);
    if (typed !== raw) this.input.value = typed;

    this.input.classList.remove("is-error");

    if (typed.length === 0) {
      this.lastInputValue = "";
      this.updatePrompt();
      return;
    }

    const okPrefix = target.startsWith(typed);
    const inserted = Math.max(0, typed.length - this.lastInputValue.length);
    if (inserted > 0) {
      this.totalTypedChars += inserted;
      if (okPrefix) {
        this.correctChars += inserted;
        if (this.sfxToggle.checked) this.audio.tick(Math.min(0.9, this.maxMatchedInToken / 8));
      } else {
        this.input.classList.add("is-error");
        if (this.sfxToggle.checked) this.audio.error();
        this.input.value = this.lastInputValue;
        typed = this.lastInputValue;
      }
    } else if (!okPrefix && typed.length > 0) {
      this.input.classList.add("is-error");
    }

    if (okPrefix) {
      const matchedLen = typed.length;
      if (matchedLen > this.maxMatchedInToken) {
        const delta = matchedLen - this.maxMatchedInToken;
        this.maxMatchedInToken = matchedLen;
        this.distance += delta * this.unitDistancePerChar;
      }
    }

    this.lastInputValue = typed;

    if (typed === target) {
      this.advanceToken();
    }

    this.updatePrompt();
    this.updateStats();
  }

  advanceToken() {
    this.input.value = "";
    this.maxMatchedInToken = 0;
    this.lastInputValue = "";
    this.tokenIndex += 1;
    if (this.tokenIndex >= this.tokens.length) {
      this.setupTokens();
    }
    this.currentTarget = this.tokens[this.tokenIndex] ?? "";
    this.updatePrompt();
  }

  frame(ts) {
    if (this.state === "finished") {
      this.render();
      return;
    }

    if (!this.lastFrameAt) this.lastFrameAt = ts;
    const dt = clamp((ts - this.lastFrameAt) / 1000, 0, 0.05);
    this.lastFrameAt = ts;

    if (this.state === "countdown") {
      const leftMs = Math.max(0, this.countdownUntil - nowMs());
      const nextValue = Math.ceil(leftMs / 1000);
      if (nextValue !== this.countdownValue) {
        this.countdownValue = nextValue;
        this.setStatus(nextValue > 0 ? `倒计时 ${nextValue}...` : "开始！");
        if (this.voiceToggle.checked) this.voice.speak(nextValue > 0 ? String(nextValue) : "开始");
        if (this.sfxToggle.checked) this.audio.countBeep(nextValue);
      }
      if (leftMs <= 0) {
        this.state = "running";
        this.startedAt = nowMs();
        this.elapsedSec = 0;
        this.lastFrameAt = ts;
        this.setStatus("比赛中");
        if (this.sfxToggle.checked) this.audio.startGo();
        this.input.focus();
      }
    } else if (this.state === "running") {
      this.elapsedSec = (nowMs() - this.startedAt) / 1000;
      this.updateStats();
      this.updateAi(dt);
      this.checkFinish();
    }

    const lerp = 1 - Math.pow(0.001, dt); // frame-rate independent smoothing
    this.renderDistance += (this.distance - this.renderDistance) * lerp;
    this.render();
    requestAnimationFrame((t) => this.frame(t));
  }

  updateAi(dt) {
    const diff = DIFFICULTY[this.diffSelect.value] ?? DIFFICULTY.normal;
    const jitter1 = (Math.random() - 0.5) * 0.5;
    const jitter2 = (Math.random() - 0.5) * 0.6;
    this.ai1 += Math.max(0, diff.ai1 + jitter1) * dt;
    this.ai2 += Math.max(0, diff.ai2 + jitter2) * dt;
  }

  checkFinish() {
    const diff = DIFFICULTY[this.diffSelect.value] ?? DIFFICULTY.normal;
    const track = diff.trackDistance;
    if (this.distance >= track) this.finish("you");
    else if (this.ai2 >= track) this.finish("ai2");
    else if (this.ai1 >= track) this.finish("ai1");
  }

  render() {
    const ctx = this.ctx;
    const w = this.trackCanvas.width;
    const h = this.trackCanvas.height;
    ctx.clearRect(0, 0, w, h);
    // 背景
    ctx.fillStyle = "#f4f4f5";
    roundRect(ctx, 12 * this.dpr, 12 * this.dpr, w - 24 * this.dpr, h - 24 * this.dpr, 20 * this.dpr);
    ctx.fill();
    // 大标题：已正确
    ctx.fillStyle = "#6b7280";
    ctx.font = `bold ${Math.round(20 * this.dpr)}px ui-sans-serif, system-ui`;
    ctx.textBaseline = "top";
    ctx.fillText("已正确（字符）", 32 * this.dpr, 24 * this.dpr);
    // 数字
    ctx.fillStyle = "#111827";
    ctx.font = `bold ${Math.round(72 * this.dpr)}px ui-sans-serif, system-ui`;
    ctx.textBaseline = "middle";
    ctx.fillText(String(this.correctChars), 32 * this.dpr, h / 2);
    // 辅助：准确率
    const acc = this.totalTypedChars <= 0 ? 1 : this.correctChars / this.totalTypedChars;
    ctx.fillStyle = "#6b7280";
    ctx.font = `bold ${Math.round(18 * this.dpr)}px ui-sans-serif, system-ui`;
    ctx.fillText(`准确率：${formatPct(clamp(acc, 0, 1))}`, 32 * this.dpr, h - 48 * this.dpr);
    // 状态覆盖
    if (this.state === "countdown") {
      const t = this.countdownValue > 0 ? String(this.countdownValue) : "GO";
      drawOverlayText(ctx, w, h, t, this.dpr, "#a855f7");
    } else if (this.state === "idle") {
      drawOverlayText(ctx, w, h, "点击开始", this.dpr, "#3b82f6");
    } else if (this.state === "finished") {
      drawOverlayText(ctx, w, h, "结束", this.dpr, "#ef4444");
    }
  }

  drawCar(x, y, w, h, color, label) {
    const ctx = this.ctx;
    ctx.fillStyle = color;
    roundRect(ctx, x, y, w, h, 10 * this.dpr);
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.4)";
    roundRect(ctx, x + w * 0.62, y + h * 0.12, w * 0.28, h * 0.76, 8 * this.dpr);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${Math.round(14 * this.dpr)}px ui-sans-serif, system-ui`;
    ctx.textBaseline = "middle";
    ctx.fillText(label, x + 8 * this.dpr, y + h / 2);
  }

  renderAir(w, h) {
    const ctx = this.ctx;
    // background
    const grd = ctx.createLinearGradient(0, 0, 0, h);
    grd.addColorStop(0, "#87CEEB"); // Light sky blue
    grd.addColorStop(1, "#E0F6FF");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);

    // mountains
    ctx.fillStyle = "#A7F3D0"; // Light green mountains
    ctx.beginPath();
    ctx.moveTo(0, h * 0.6);
    ctx.lineTo(w * 0.3, h * 0.48);
    ctx.lineTo(w * 0.55, h * 0.55);
    ctx.lineTo(w * 0.8, h * 0.5);
    ctx.lineTo(w, h * 0.58);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    // player plane
    const px = 40 * this.dpr;
    const py = h * 0.25;
    this.drawPlane(px, py, "#a855f7"); // purple

    // enemies
    const enemies = [
      { y: h * 0.2, token: this.tokens[this.tokenIndex] || "" },
      { y: h * 0.5, token: this.tokens[this.tokenIndex + 1] || "" },
      { y: h * 0.8, token: this.tokens[this.tokenIndex + 2] || "" },
    ];
    const ex = w - 140 * this.dpr;
    for (const e of enemies) {
      this.drawPlane(ex, e.y, "#22c55e");
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.font = `${Math.round(18 * this.dpr)}px ui-sans-serif, system-ui`;
      ctx.textBaseline = "middle";
      ctx.fillText(e.token, ex + 60 * this.dpr, e.y);
    }

    this.renderParticles();

    if (this.state === "countdown") {
      const t = this.countdownValue > 0 ? String(this.countdownValue) : "开始";
      drawOverlayText(ctx, w, h, t, this.dpr);
    } else if (this.state === "idle") {
      drawOverlayText(ctx, w, h, "点击开始", this.dpr);
    } else if (this.state === "finished") {
      drawOverlayText(ctx, w, h, "结束", this.dpr);
    }
  }

  drawPlane(x, y, color) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    roundRect(ctx, -30 * this.dpr, -12 * this.dpr, 60 * this.dpr, 24 * this.dpr, 12 * this.dpr);
    ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    roundRect(ctx, -14 * this.dpr, -8 * this.dpr, 28 * this.dpr, 16 * this.dpr, 8 * this.dpr);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-10 * this.dpr, 0, 8 * this.dpr, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fill();
    ctx.restore();
  }

  spawnConfetti(winner) {
    const color = winner === "you" ? "#7c5cff" : winner === "ai1" ? "#22c55e" : "#f59e0b";
    const count = 140;
    this.particles = [];
    const w = this.trackCanvas.width;
    const h = this.trackCanvas.height;
    for (let i = 0; i < count; i += 1) {
      this.particles.push({
        x: Math.random() * w,
        y: -10,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 2 + 1.5,
        size: Math.random() * 3 + 2,
        life: Math.random() * 1 + 0.8,
        color,
      });
    }
    this.particlesColor = color;
  }

  renderParticles() {
    if (!this.particles || this.particles.length === 0) return;
    const ctx = this.ctx;
    const w = this.trackCanvas.width;
    const h = this.trackCanvas.height;
    ctx.save();
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02;
      p.life -= 0.008;
      if (p.y > h + 15 || p.life <= 0) {
        p.y = -10;
        p.x = Math.random() * w;
        p.vx = (Math.random() - 0.5) * 2;
        p.vy = Math.random() * 2 + 1.5;
        p.life = Math.random() * 1 + 0.8;
      }
      ctx.fillStyle = this.particlesColor + Math.floor(clamp(p.life, 0, 1) * 255).toString(16).padStart(2, "0");
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }
    ctx.restore();
  }

  buildKeyboard() {
    if (!this.keyboardEl) return;
    const rows = [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
      ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
    ];
    const zones = KEY_ZONES;
    const html = rows
      .map(
        (r) =>
          `<div class="kb-row">${r
            .map((k) => {
              const zone = zones[k] ?? "unknown";
              const label = k.length === 1 ? k.toUpperCase() : k;
              return `<div class="kb-key" data-key="${k}" data-zone="${zone}">${label}</div>`;
            })
            .join("")}</div>`
      )
      .join("");
    this.keyboardEl.innerHTML = html;
  }

  highlightKeyboard() {
    if (!this.keyboardEl) return;
    const keys = this.keyboardEl.querySelectorAll(".kb-key");
    keys.forEach((el) => el.classList.remove("is-zone", "is-target"));
    
    const modeKey = this.modeSelect.value;
    if (modeKey === "course") {
      const courseId = this.courseSelect.value;
      const course = COURSE_MAP[courseId] || "";
      const courseChars = new Set(course.split("").map(toPhysicalKey));
      keys.forEach((el) => {
        if (courseChars.has(el.getAttribute("data-key"))) el.classList.add("is-zone");
      });
    }

    const nextChar = this.getNextExpectedChar();
    if (nextChar) {
      const physical = toPhysicalKey(nextChar);
      const el = this.keyboardEl.querySelector(`.kb-key[data-key="${CSS.escape(physical)}"]`);
      if (el) el.classList.add("is-target");
    }
  }

  getNextExpectedChar() {
    const modeKey = this.modeSelect.value;
    if (modeKey === "hanzi") return "";
    const target =
      modeKey === "course"
        ? this.currentTarget ?? ""
        : normalizeForMode(modeKey, this.currentTarget ?? "");
    const typed =
      modeKey === "course"
        ? this.input.value ?? ""
        : normalizeForMode(modeKey, this.input.value ?? "");
    let i = 0;
    while (i < typed.length && i < target.length && target[i] === typed[i]) i += 1;
    return target[i] ?? "";
  }
}

const roundRect = (ctx, x, y, w, h, r) => {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
};

const drawOverlayText = (ctx, w, h, text, dpr, color = "#a855f7") => {
  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = color;
  ctx.font = `bold ${Math.round(48 * dpr)}px ui-sans-serif, system-ui`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, w / 2, h / 2);
  ctx.restore();
};

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
  }
  init() {
    if (this.ctx) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const master = ctx.createGain();
    master.gain.value = 0.12;
    master.connect(ctx.destination);
    this.ctx = ctx;
    this.master = master;
  }
  env(duration = 0.08) {
    if (!this.ctx) return null;
    const t0 = this.ctx.currentTime;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(1, t0 + 0.005);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
    g.connect(this.master);
    return { g, t0 };
  }
  osc(freq, type = "sine", duration = 0.08) {
    if (!this.ctx) return;
    const e = this.env(duration);
    if (!e) return;
    const o = this.ctx.createOscillator();
    o.frequency.value = freq;
    o.type = type;
    o.connect(e.g);
    o.start();
    o.stop(e.t0 + duration);
  }
  tick(progress = 0) {
    const f = 500 + progress * 600;
    this.osc(f, "triangle", 0.06);
  }
  error() {
    if (!this.ctx) return;
    const t0 = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(140, t0);
    o.frequency.exponentialRampToValueAtTime(90, t0 + 0.12);
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.8, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.18);
    o.connect(g);
    g.connect(this.master);
    o.start();
    o.stop(t0 + 0.2);
  }
  startGo() {
    this.osc(880, "square", 0.08);
  }
  countBeep(n) {
    if (!this.ctx) return;
    const f = 480 - n * 60;
    this.osc(Math.max(200, f), "sine", 0.06);
  }
  fanfare(winner) {
    if (!this.ctx) return;
    const seq = winner === "you" ? [660, 880, 990] : [440, 330, 220];
    let t = 0;
    for (const f of seq) {
      setTimeout(() => this.osc(f, "triangle", 0.1), t);
      t += 110;
    }
  }
}

class VoiceEngine {
  constructor() {
    this.ready = false;
    this.voice = null;
    this.initVoices();
  }
  initVoices() {
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return;
      const zh = voices.find((v) => /zh|chinese|mandarin/i.test(`${v.lang} ${v.name}`));
      this.voice = zh || voices[0];
      this.ready = true;
    };
    pickVoice();
    if (!this.ready) {
      window.speechSynthesis.onvoiceschanged = () => pickVoice();
    }
  }
  speak(text) {
    if (!("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    if (this.voice) u.voice = this.voice;
    u.rate = 1.0;
    u.pitch = 1.0;
    u.volume = 1.0;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }
}

RaceGame.prototype.persistSettings = function () {
  const data = {
    sfx: this.sfxToggle.checked ? 1 : 0,
    voice: this.voiceToggle.checked ? 1 : 0,
  };
  try {
    localStorage.setItem("typerace_settings", JSON.stringify(data));
  } catch {}
};

RaceGame.prototype.restoreSettings = function () {
  try {
    const raw = localStorage.getItem("typerace_settings");
    if (!raw) return;
    const data = JSON.parse(raw);
    if (typeof data.sfx !== "undefined") this.sfxToggle.checked = !!data.sfx;
    if (typeof data.voice !== "undefined") this.voiceToggle.checked = !!data.voice;
  } catch {}
};
const KEY_ZONES = {
  // left pinky
  "`": "left_pinky", "1": "left_pinky", q: "left_pinky", a: "left_pinky", z: "left_pinky",
  // left ring
  "2": "left_ring", w: "left_ring", s: "left_ring", x: "left_ring",
  // left middle
  "3": "left_middle", e: "left_middle", d: "left_middle", c: "left_middle",
  // left index
  "4": "left_index", "5": "left_index", r: "left_index", f: "left_index", v: "left_index", t: "left_index", g: "left_index", b: "left_index",
  // right index
  "6": "right_index", "7": "right_index", y: "right_index", h: "right_index", n: "right_index", u: "right_index", j: "right_index", m: "right_index",
  // right middle
  "8": "right_middle", i: "right_middle", k: "right_middle",
  // right ring
  "9": "right_ring", o: "right_ring", l: "right_ring", ".": "right_ring",
  // right pinky
  "0": "right_pinky", "-": "right_pinky", "=": "right_pinky",
  p: "right_pinky", "[": "right_pinky", "]": "right_pinky", "\\": "right_pinky",
  ";": "right_pinky", "'": "right_pinky",
  ",": "right_middle", "/": "right_pinky",
};

const ZONE_KEYS = {
  any: Object.keys(KEY_ZONES),
  left_pinky: ["q", "a", "z"],
  left_ring: ["w", "s", "x"],
  left_middle: ["e", "d", "c"],
  left_index: ["r", "t", "f", "g", "v", "b"],
  right_index: ["y", "u", "h", "j", "n", "m"],
  right_middle: ["i", "k"],
  right_ring: ["o", "l"],
  right_pinky: ["p"],
};

const makeZoneTokens = (zone, count) => {
  const keys = ZONE_KEYS[zone] ?? ZONE_KEYS.any;
  const out = [];
  for (let i = 0; i < count; i += 1) {
    const len = Math.random() < 0.3 ? 2 : 1; // occasional bigrams
    let token = "";
    for (let j = 0; j < len; j += 1) token += keys[Math.floor(Math.random() * keys.length)];
    out.push(token);
  }
  return out;
};

const COURSE_MAP = {
  home: "asdfjkl;",
  home_expand: "asdfghjkl;",
  home_shift: "ASDFGHJKL:",
  quotes: "'\"",
  top_row_lower: "qwertyuiop",
  bottom_row_lower: "zxcvbnm,./",
  top_row_upper: "QWERTYUIOP",
  bottom_row_upper: "ZXCVBNM,./?",
  letters_review: "abcdefghijklmnopqrstuvwxyz",
  brackets: "{}[]<>",
  digits: "1234567890",
  digits_shift: "!@#$%^&*()",
  math: "-=_+",
  all_review:
    "asdfjkl;ghQWERTYUIOPZXCVBNM,./?{}[]<>1234567890!@#$%^&*()-=_+\"'",
};

const makeCourseTokens = (course, count) => {
  const set = COURSE_MAP[course] || COURSE_MAP.home;
  const chars = set.split("");
  const out = [];
  for (let i = 0; i < count; i += 1) {
    const len = Math.random() < 0.4 ? 2 : 1;
    let t = "";
    for (let j = 0; j < len; j += 1) t += chars[Math.floor(Math.random() * chars.length)];
    out.push(t);
  }
  return out;
};

const makeCustomTokens = (raw, count) => {
  const txt = String(raw ?? "").trim();
  if (!txt) return [];
  const tokens = txt
    .split(/[\s,，、]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const out = [];
  for (let i = 0; i < count; i += 1) out.push(pick(tokens));
  return out;
};

const toPhysicalKey = (ch) => {
  const map = {
    "!": "1",
    "@": "2",
    "#": "3",
    "$": "4",
    "%": "5",
    "^": "6",
    "&": "7",
    "*": "8",
    "(": "9",
    ")": "0",
    "_": "-",
    "+": "=",
    "{": "[",
    "}": "]",
    "|": "\\",
    ":": ";",
    '"': "'",
    "<": ",",
    ">": ".",
    "?": "/",
  };
  if (map[ch]) return map[ch];
  return ch.toLowerCase();
};

const game = new RaceGame();
game.diffSelect.addEventListener("change", () => {
  if (game.state === "idle") game.render();
});
