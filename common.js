// //////////////////////////////////////////////////////
// Function to sort table rows alphabetically in Japanese
$(function () {
  const ths = $(".sort-parti-table .sorting-name");
  const thString = $(".sort-parti-table .string-sort");
  const thNumber = $(".sort-parti-table .number-sort");
  let sortOrder = 1;

  ths.on("click", function () {
    const rows = sortRows(this);
    rebuildTbody(rows);
    updateClassName(this);
    sortOrder *= -1;
  });

  thString.on("click", function () {
    const rows = sortRows(this);
    rebuildTbody(rows);
    updateClassName(this);
    sortOrder *= -1;
  });

  thNumber.on("click", function () {
    const rows = sortRows(this);
    rebuildTbody(rows);
    updateClassName(this);
    sortOrder *= -1;
  });

  function sortRows(th) {
    const rows = $.makeArray($(".sort-parti-table tbody > tr"));
    const col = th.cellIndex;
    const type = $(th).data("type");
    rows.sort(function (a, b) {
      return compare(a, b, col, type) * sortOrder;
    });
    return rows;
  }

  function compare(a, b, col, type) {
    let _a = a.children[col].textContent;
    let _b = b.children[col].textContent;

    if (type === "number") {
      _a *= 1;
      _b *= 1;
    } else if (type === "string") {
      //toLowerCase()
      _a = _a.toLowerCase();
      _b = _b.toLowerCase();
    } else if (type === "ja-name") {
      // Use localeCompare to compare Japanese names
      return _a.localeCompare(_b, "ja");
    }

    if (_a < _b) {
      return -1;
    }
    if (_a > _b) {
      return 1;
    }
    return 0;
  }

  function rebuildTbody(rows) {
    const tbody = $(".sort-parti-table tbody");
    tbody.empty(); // Clear the tbody

    for (let j = 0; j < rows.length; j++) {
      tbody.append(rows[j]);
    }
  }

  function updateClassName(th) {
    ths.removeClass("asc desc"); // Remove existing sorting classes
    th.classList.add(sortOrder === 1 ? "asc" : "desc");
  }
});
