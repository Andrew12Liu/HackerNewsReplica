var start = 0;
var end = 30;

$.ajax({
  url: "http://127.0.0.1:5000/hello",
  cache: false,
  success: function(json){
    for (let i = start; i < end; i++){
      let post = json[i]
      $("#hello").append(
        `<tr bgcolor="#F6F6F0"> <td><table border="0" cellpadding="0" cellspacing="0" class="itemlist"><td align="right" valign="top" class="title" style="padding-left:5px;"><span><font color="#828282">${1+parseInt(i)}.</font></span></td>
                <td valign="top" class="votelinks" style="padding-left:20px;">
                </td>
                <td style="position: relative;"> <a href="${post["url"]}" style="text-decoration:none">
                   ${post["title"]}
                   </a>
                   <a href="" class="posttext">(${post["website"]})</a>
                </td>
                </tr>
                <tr>
                   <td colspan="2"></td>
                   <td bgcolor="#F6F6F0">
                      <span class="posttext">${post["score"]} points</span><font color="#828282"><span style="font-size:10px"> by</span> </font> <a href="" class="posttext">${post["by"]}</a> <a href="" class="posttext">${post["time"]} hours ago</a><font color="#828282"> <span style="font-size:10px"> | </span> </font><a href="" class="posttext">hide</a><font color="#828282"><span style="font-size:10px"> | </span> </font> <a href="https://news.ycombinator.com/item?id=${post["id"]}" class="posttext"> ${post["descendants"]} comments</a>
                   </td>
                </tr>
                <tr style="height:5px"></tr>
                </tbody>
             </table>
          </td>
       </tr>`)
}

    console.log(json)
    start = end;
    end = end + 30;
  }
});

$(window).scroll(function(json) {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
     $.ajax({
       url: "http://127.0.0.1:5000/hello",
       cache: false,
       success: function(json){
         for (let i = start; i < end; i++){
           let post = json[i]
           $("#hello").append(
             `<tr bgcolor="#F6F6F0"> <td><table border="0" cellpadding="0" cellspacing="0" class="itemlist"><td align="right" valign="top" class="title" style="padding-left:5px;"><span><font color="#828282">${1+parseInt(i)}.</font></span></td>
                     <td valign="top" class="votelinks" style="padding-left:20px;">
                     </td>
                     <td style="position: relative;"> <a href="${post["url"]}" style="text-decoration:none">
                        ${post["title"]}
                        </a>
                        <a href="" class="posttext">(${post["website"]})</a>
                     </td>
                     </tr>
                     <tr>
                        <td colspan="2"></td>
                        <td bgcolor="#F6F6F0">
                           <span class="posttext">${post["score"]} points</span><font color="#828282"><span style="font-size:10px"> by</span> </font> <a href="" class="posttext">${post["by"]}</a> <a href="" class="posttext">${post["time"]} hours ago</a><font color="#828282"> <span style="font-size:10px"> | </span> </font><a href="" class="posttext">hide</a><font color="#828282"><span style="font-size:10px"> | </span> </font> <a href="https://news.ycombinator.com/item?id=${post["id"]}" class="posttext"> ${post["descendants"]} comments</a>
                        </td>
                     </tr>
                     <tr style="height:5px"></tr>
                     </tbody>
                  </table>
               </td>
            </tr>`)
     }

         console.log(json)

         start = end;
         end = end + 30;
       }
     });

   }
});
