document.addEventListener('DOMContentLoaded', () => {
  const X1 = document.getElementById('X1');
  const Y1 = document.getElementById('Y1');
  const X2 = document.getElementById('X2');
  const Y2 = document.getElementById('Y2');
  const X3 = document.getElementById('X3');
  const Y3 = document.getElementById('Y3');
  const X4 = document.getElementById('X4');
  const Y4 = document.getElementById('Y4');

  const checkBtn = document.getElementById('checkBtn');

  let p, S, S1, S2, S3, d1, d2, d3;
  const Eps = 0.001;
  const closeDistance = 0.1;

  const distance = (Ax, Ay, Bx, By) => {
    return Math.sqrt(Math.pow(Ax - Bx, 2) + Math.pow(Ay - By, 2));
  }

  const HeronArea = (a, b, c) => {
    p = (a + b + c) / 2;
    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
  }

  const pointToLineDistance = (x1, y1, x2, y2, px, py) => {
    return Math.abs((y2 - y1) * px - (x2 - x1) * py + x2 * y1 - y2 * x1) / distance(x1, y1, x2, y2);
  }

  function checkPoint() {
    let a = distance(X1.value, Y1.value, X2.value, Y2.value);
    let b = distance(X2.value, Y2.value, X3.value, Y3.value);
    let c = distance(X3.value, Y3.value, X1.value, Y1.value);
    S = HeronArea(a, b, c);

    let a1 = distance(X1.value, Y1.value, X4.value, Y4.value);
    let b1 = distance(X2.value, Y2.value, X4.value, Y4.value);
    let c1 = distance(X3.value, Y3.value, X4.value, Y4.value);

    S1 = HeronArea(a1, b1, a);
    S2 = HeronArea(b1, c1, b);
    S3 = HeronArea(a1, c1, c);

    if (Math.abs(S - (S1 + S2 + S3)) < Eps) {
      if (Math.abs(S1) < Eps || Math.abs(S2) < Eps || Math.abs(S3) < Eps)
        alert('Точка на лінії');
      else
        alert('Точка всередині трикутника');
    } else {
      alert('Точка поза трикутником');
    }

    if (a1 < closeDistance || b1 < closeDistance || c1 < closeDistance)
      alert('Точка дуже близько до однієї з вершин');

    d1 = pointToLineDistance(X1.value, Y1.value, X2.value, Y2.value, X4.value, Y4.value);
    d2 = pointToLineDistance(X2.value, Y2.value, X3.value, Y3.value, X4.value, Y4.value);
    d3 = pointToLineDistance(X3.value, Y3.value, X1.value, Y1.value, X4.value, Y4.value);

    if (d1 < closeDistance || d2 < closeDistance || d3 < closeDistance)
      alert('Точка дуже близько до однiєї зi сторiн трикутника');
  }

  checkBtn.addEventListener('click', checkPoint);
});