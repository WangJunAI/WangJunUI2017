using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Net;

namespace WangJun.API
{
    public class WeChatAPI
    {
        public static WeChatAPI GetInstance() {
            var inst = new WeChatAPI();
            return inst;
        }

        public string GetToken(string appID= "wx8255319090ead622", string appSecret= "17555426b603dfc1309234cd85aa8028") {
            var url = string.Format("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={0}&secret={1]",appID,appSecret);
            var res=HTTP.GetInstance().GetString(url);
            Console.WriteLine(res);

            return res;
        }

        public void UploadFile() {
            var url = string.Format("http://file.api.weixin.qq.com/cgi-bin/media/upload?access_token=12_wjsFcJdd-2aNAUhY_76obwKPlwitIsekY-xnTbosHDnPD3-wkXy9y9cxQDw7PoTi948GzZ6WOBIljIwpU1iraccaOcarrgi-y3MVqCkO1Fw6DsEVacNtVSfd_2t_v8nnoTHzepwPp53lAB5rBZLdAIAWUG&type=image");
            HTTP.GetInstance().UploadFile(url, "C:/01.jpg");
            Console.WriteLine("上传完毕");
        }
    }
}
