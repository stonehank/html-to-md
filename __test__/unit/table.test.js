import Table from '../../src/tags/table'

describe("test <table></table> tag",()=>{

  it('table default align style',()=>{
    let table=new Table("<table>\n" +
      "<thead>\n" +
      "<tr>\n" +
      "<th><s>col-1</s></th>\n" +
      "<th>col-2</th>\n" +
      "<th>col-3</th>\n" +
      "</tr>\n" +
      "</thead>\n" +
      "<tbody>\n" +
      "<tr>\n" +
      "<td>data-1-left</td>\n" +
      "<td>data-1-center</td>\n" +
      "<td><code>data-1-right</code></td>\n" +
      "</tr>\n" +
      "<tr>\n" +
      "<td>data-2-left</td>\n" +
      "<td><b>data-2-center</b></td>\n" +
      "<td>data-2-right</td>\n" +
      "</tr>\n" +
      "<tr>\n" +
      "<td><i>data-3-left</i></td>\n" +
      "<td>data-3-center</td>\n" +
      "<td>data-3-right</td>\n" +
      "</tr>\n" +
      "</tbody>\n" +
      "</table>")
    expect(table.execMerge()).toBe("\n" +
      "|~~col-1~~|col-2|col-3|\n" +
      "|:---|:---|:---|\n" +
      "|data-1-left|data-1-center|`data-1-right`|\n" +
      "|data-2-left|**data-2-center**|data-2-right|\n" +
      "|*data-3-left*|data-3-center|data-3-right|\n")
  })

  it('table has align style',()=>{
    let table=new Table("<table class=\"table table-striped\">\n" +
      "<thead>\n" +
      "<tr>\n" +
      "<th style=\"text-align:left\"><s>col-1</s></th>\n" +
      "<th style=\"text-align:center\">col-2</th>\n" +
      "<th style=\"text-align:right\">col-3</th>\n" +
      "</tr>\n" +
      "</thead>\n" +
      "<tbody>\n" +
      "<tr>\n" +
      "<td style=\"text-align:left\">data-1-left</td>\n" +
      "<td style=\"text-align:center\">data-1-center</td>\n" +
      "<td style=\"text-align:right\"><code>data-1-right</code></td>\n" +
      "</tr>\n" +
      "<tr>\n" +
      "<td style=\"text-align:left\">data-2-left</td>\n" +
      "<td style=\"text-align:center\"><b>data-2-center</b></td>\n" +
      "<td style=\"text-align:right\">data-2-right</td>\n" +
      "</tr>\n" +
      "<tr>\n" +
      "<td style=\"text-align:left\"><i>data-3-left</i></td>\n" +
      "<td style=\"text-align:center\">data-3-center</td>\n" +
      "<td style=\"text-align:right\">data-3-right</td>\n" +
      "</tr>\n" +
      "</tbody>\n" +
      "</table>")
    expect(table.execMerge()).toBe("\n" +
      "|~~col-1~~|col-2|col-3|\n" +
      "|:---|:---:|---:|\n" +
      "|data-1-left|data-1-center|`data-1-right`|\n" +
      "|data-2-left|**data-2-center**|data-2-right|\n" +
      "|*data-3-left*|data-3-center|data-3-right|\n")
  })

  it('table default align style, compact mode',()=>{
    let table=new Table(`<table><thead><tr><th><s>col-1</s></th><th>col-2</th><th>col-3</th></tr></thead><tbody><tr><td>data-1-left</td><td>data-1-center</td><td><code>data-1-right</code></td></tr><tr><td>data-2-left</td><td><b>data-2-center</b></td><td>data-2-right</td></tr><tr><td><i>data-3-left</i></td><td>data-3-center</td><td>data-3-right</td></tr></tbody></table>`)
    expect(table.execMerge()).toBe("\n" +
      "|~~col-1~~|col-2|col-3|\n" +
      "|:---|:---|:---|\n" +
      "|data-1-left|data-1-center|`data-1-right`|\n" +
      "|data-2-left|**data-2-center**|data-2-right|\n" +
      "|*data-3-left*|data-3-center|data-3-right|\n")
  })

  it('table has align style, compact mode',()=>{
    let table=new Table(`<table class="table table-striped"><thead><tr><th style=\"text-align:left\"><s>col-1</s></th><th style=\"text-align:center\">col-2</th><th style=\"text-align:right\">col-3</th></tr></thead><tbody><tr><td style=\"text-align:left\">data-1-left</td><td style=\"text-align:center\">data-1-center</td><td style=\"text-align:right\"><code>data-1-right</code></td></tr><tr><td style=\"text-align:left\">data-2-left</td><td style=\"text-align:center\"><b>data-2-center</b></td><td style=\"text-align:right\">data-2-right</td></tr><tr><td style=\"text-align:left\"><i>data-3-left</i></td><td style=\"text-align:center\">data-3-center</td><td style=\"text-align:right\">data-3-right</td></tr></tbody></table>`)
    expect(table.execMerge()).toBe("\n" +
      "|~~col-1~~|col-2|col-3|\n" +
      "|:---|:---:|---:|\n" +
      "|data-1-left|data-1-center|`data-1-right`|\n" +
      "|data-2-left|**data-2-center**|data-2-right|\n" +
      "|*data-3-left*|data-3-center|data-3-right|\n")
  })

  it('table default align style, multi \n ',()=>{
    let table=new Table("<table>\n\n\n\n\n\n\n" +
      "<thead>\n\n\n\n\n\n\n" +
      "<tr>\n\n\n\n\n\n\n" +
      "<th><s>col-1</s></th>\n\n\n\n\n\n\n" +
      "<th>col-2</th>\n\n\n\n\n\n\n" +
      "<th>col-3</th>\n\n\n\n\n\n\n" +
      "</tr>\n\n\n\n\n\n\n" +
      "</thead>\n\n\n\n\n\n\n" +
      "<tbody>\n\n\n\n\n\n\n" +
      "<tr>\n\n\n\n\n\n\n" +
      "<td>data-1-left</td>\n\n\n\n\n\n\n" +
      "<td>data-1-center</td>\n\n\n\n\n\n\n" +
      "<td><code>data-1-right</code></td>\n\n\n\n\n\n\n" +
      "</tr>\n\n\n\n\n\n\n" +
      "<tr>\n\n\n\n\n\n\n" +
      "<td>data-2-left</td>\n\n\n\n\n\n\n" +
      "<td><b>data-2-center</b></td>\n\n\n\n\n\n\n" +
      "<td>data-2-right</td>\n\n\n\n\n\n\n" +
      "</tr>\n\n\n\n\n\n\n" +
      "<tr>\n\n\n\n\n\n\n" +
      "<td><i>data-3-left</i></td>\n\n\n\n\n\n\n" +
      "<td>data-3-center</td>\n\n\n\n\n\n\n" +
      "<td>data-3-right</td>\n\n\n\n\n\n\n" +
      "</tr>\n\n\n\n\n\n\n" +
      "</tbody>\n\n\n\n\n\n\n" +
      "</table>")
    expect(table.execMerge()).toBe("\n" +
      "|~~col-1~~|col-2|col-3|\n" +
      "|:---|:---|:---|\n" +
      "|data-1-left|data-1-center|`data-1-right`|\n" +
      "|data-2-left|**data-2-center**|data-2-right|\n" +
      "|*data-3-left*|data-3-center|data-3-right|\n")
  })

})
