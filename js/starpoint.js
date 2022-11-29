const drawStar = (target) => {
  document.querySelector(`.star span`).style.width = `${target.value * 10}%`;
};

// star pointクリックすると、点数表出
function setStarVal(valInput) {
  let starInput = valInput;
  $("#starVal").text(starInput.value / 2);
}
