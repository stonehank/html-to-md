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

})
