// Dùng chung cho index.html (danh sách xe) và quiz.html (trắc nghiệm)
// Cần nạp data.js trước file này.

const ATTRS = ["tk", "ben", "dep", "manh", "cop", "gon", "to"];

function fmt(n) {
  return n.toFixed(2).replace(".", ",");
}

function giaText(b) {
  return fmt(b.giaMin) + " – " + fmt(b.giaMax) + " triệu";
}

function imgBox(b) {
  return '<div class="bike-img"><span>' + b.ten + '</span>' +
    '<img src="' + b.img + '" alt="' + b.ten + '" onerror="this.remove()"></div>';
}

/* ---------- Trang danh sách ---------- */
function initList() {
  const list = document.getElementById("bike-list");
  if (!list) return;

  let loai = "all";
  let sort = "default";

  function render() {
    let items = BIKES.filter(function (b) { return loai === "all" || b.loai === loai; });
    if (sort === "asc") items = items.slice().sort(function (a, b) { return a.giaMin - b.giaMin; });
    if (sort === "desc") items = items.slice().sort(function (a, b) { return b.giaMin - a.giaMin; });

    list.innerHTML = items.map(function (b) {
      return '<div class="col-sm-6 col-lg-4">' +
        '<div class="bike-card">' + imgBox(b) +
        '<div class="body">' +
        '<h3>' + b.ten + '</h3>' +
        '<div class="meta">' + LOAI[b.loai] + ' · ' + giaText(b) + '</div>' +
        '<div class="desc">' + b.tomtat + '</div>' +
        '<a class="btn btn-outline-dark btn-sm mt-3" href="xe/' + b.id + '.html">Xem chi tiết</a>' +
        '</div></div></div>';
    }).join("");

    document.getElementById("count").textContent = items.length + " mẫu xe";
  }

  document.querySelectorAll("[data-loai]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      loai = btn.getAttribute("data-loai");
      document.querySelectorAll("[data-loai]").forEach(function (x) {
        x.classList.toggle("btn-dark", x === btn);
        x.classList.toggle("btn-outline-dark", x !== btn);
      });
      render();
    });
  });

  document.getElementById("sort").addEventListener("change", function (e) {
    sort = e.target.value;
    render();
  });

  render();
}

/* ---------- Tính điểm gợi ý ---------- */
function computeResult(answers) {
  const tot = {};
  let cap = 70;
  let loai = null;
  let coBangA = false;

  answers.forEach(function (k, qi) {
    const o = QUESTIONS[qi].opts[k];
    if (o.w) {
      for (const a in o.w) tot[a] = (tot[a] || 0) + o.w[a];
    }
    if (o.cap) cap = o.cap;
    if (o.loai) loai = o.loai;
    if (o.bangA) coBangA = true;
  });

  const res = BIKES.map(function (b) {
    let s = 0;
    const contrib = {};
    ATTRS.forEach(function (a) {
      const c = (tot[a] || 0) * b[a];
      contrib[a] = c;
      s += c;
    });

    const over = b.giaMin > cap;
    if (over) s -= 1000;
    else s += 6 * b.giaMin / cap;

    if (loai && b.loai === loai) s += (loai === "con" ? 20 : 12);
    if (b.bang === "A" && !coBangA) s -= 3;

    return { b: b, s: s, contrib: contrib, over: over };
  }).sort(function (x, y) { return y.s - x.s; });

  return { res: res, tot: tot, cap: cap, loai: loai };
}

function reasonsFor(item, tot) {
  return ATTRS
    .filter(function (a) { return (tot[a] || 0) > 0 && item.b[a] >= 4; })
    .sort(function (x, y) { return item.contrib[y] - item.contrib[x]; })
    .slice(0, 2)
    .map(function (a) { return ATTR_LABEL[a]; });
}

/* ---------- Trang trắc nghiệm ---------- */
function initQuiz() {
  const box = document.getElementById("quiz");
  if (!box) return;

  let i = 0;
  const answers = [];

  function showQuestion() {
    const q = QUESTIONS[i];
    box.innerHTML =
      '<h1 class="quiz-title">BẠN PHÙ HỢP VỚI XE NÀO?</h1>' +
      '<p class="quiz-q">' + (i + 1) + '. ' + q.q.toUpperCase() + '</p>' +
      '<div class="quiz-grid">' +
      q.opts.map(function (o, k) {
        return '<button type="button" class="tile" data-k="' + k + '">' +
          "ABCD"[k] + ': ' + o.t.toUpperCase() + '</button>';
      }).join("") +
      '</div>' +
      '<div class="quiz-foot"><span>Câu ' + (i + 1) + '/' + QUESTIONS.length + '</span>' +
      (i > 0 ? '<button type="button" class="link-btn" id="back">Quay lại câu trước</button>' : '') +
      '</div>';

    box.querySelectorAll(".tile").forEach(function (btn) {
      btn.addEventListener("click", function () {
        answers[i] = parseInt(btn.getAttribute("data-k"), 10);
        i++;
        if (i < QUESTIONS.length) showQuestion();
        else showResult();
      });
    });

    const back = document.getElementById("back");
    if (back) {
      back.addEventListener("click", function () {
        i--;
        answers.length = i;
        showQuestion();
      });
    }
  }

  function showResult() {
    const r = computeResult(answers);
    const top = r.res[0];
    const others = r.res.filter(function (x) { return !x.over; }).slice(1, 3);
    const why = reasonsFor(top, r.tot);

    let notes = "";
    if (why.length) {
      notes += '<p class="result-note">Hợp với bạn vì: ' + why.join(", ") + '.</p>';
    }
    if (top.b.bang === "A") {
      notes += '<p class="result-note">Xe trên 125 cc, cần bằng lái hạng A.</p>';
    }
    if (r.loai === "con" && r.cap < 46.36) {
      notes += '<p class="result-note">Xe côn tay Honda (Winner R) có giá từ 46,36 triệu, cao hơn ngân sách bạn chọn nên chưa đưa vào gợi ý.</p>';
    }

    box.innerHTML =
      '<h1 class="quiz-title">XE PHÙ HỢP VỚI BẠN</h1>' +
      '<div class="result-main">' + imgBox(top.b) +
      '<h2>' + top.b.ten + '</h2>' +
      '<div class="result-note">' + LOAI[top.b.loai] + ' · ' + giaText(top.b) + '</div>' +
      '<p class="result-note">' + top.b.tomtat + '</p>' + notes +
      '<a class="btn btn-dark btn-sm" href="xe/' + top.b.id + '.html">Xem chi tiết</a>' +
      '</div>' +
      '<p class="quiz-q">Bạn cũng có thể xem thêm</p>' +
      others.map(function (o) {
        return '<div class="result-small">' + imgBox(o.b) +
          '<div class="t"><a href="xe/' + o.b.id + '.html">' + o.b.ten + '</a><br>' +
          LOAI[o.b.loai] + ' · ' + giaText(o.b) + '</div></div>';
      }).join("") +
      '<div class="result-actions">' +
      '<button type="button" class="btn btn-outline-dark btn-sm" id="again">Làm lại</button>' +
      '<a class="btn btn-outline-dark btn-sm" href="index.html">Xem tất cả xe</a>' +
      '</div>';

    document.getElementById("again").addEventListener("click", function () {
      i = 0;
      answers.length = 0;
      showQuestion();
    });
  }

  showQuestion();
}

initList();
initQuiz();
