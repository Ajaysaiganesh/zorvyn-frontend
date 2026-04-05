export const getIncome = (t) =>
  t.filter((x) => x.type === "income").reduce((a, b) => a + b.amount, 0);

export const getExpense = (t) =>
  t.filter((x) => x.type === "expense").reduce((a, b) => a + b.amount, 0);

export const getTrendData = (t) => {
  let balance = 0;
  return [...t]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((x) => {
      balance += x.type === "income" ? x.amount : -x.amount;
      return { date: x.date.slice(5), balance };
    });
};

export const getCategoryData = (t) => {
  const map = {};
  t.forEach((x) => {
    if (x.type === "expense")
      map[x.category] = (map[x.category] || 0) + x.amount;
  });
  return Object.keys(map).map((k) => ({ name: k, value: map[k] }));
};

export const getSavingsRate = (t) => {
  const income = getIncome(t);
  const expense = getExpense(t);
  if (!income) return 0;
  return Math.round(((income - expense) / income) * 100);
};