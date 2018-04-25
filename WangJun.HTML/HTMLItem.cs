using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.DB;
using WangJun.Utility;

namespace WangJun.HTML
{
    public class HTMLItem
    { 
        public string Url { get; set; }

        public string Html { get; set; }

        public object Data { get; set; }

        public bool HasProc { get; set; }

        public string Tag1 { get; set; }
        public string Tag2 { get; set; }
        public string Tag3 { get; set; }
        public string Tag4 { get; set; }
        public string Tag5 { get; set; }
        public string Tag6 { get; set; }

        public int Status { get; set; }

        public DateTime CreateTime {get;set;}

        public  static bool IsExsit(string tag1 = null, string tag2 = null)
        {
            var query = Convertor.FromObjectToJson(new { Tag1 = tag1,Tag2=tag2 });
            var res = DataStorage.GetInstance(DBType.MongoDB).Get("StockService", "Html", query,"{}", "{'Html':0}");
            return null != res;
        }
        public static HTMLItem CreateNew(string html,string tag1=null, string tag2 = null, string tag3 = null, string tag4 = null, string tag5 = null, string tag6 = null)
        {
            var inst = new HTMLItem();
             inst.Html = html;
            inst.Tag1 = tag1;
            inst.Tag2 = tag2;
            inst.Tag3 = tag3;
            inst.Tag4 = tag4;
            inst.Tag5 = tag5;
            inst.Tag6 = tag6;
            inst.CreateTime = DateTime.Now;
            return inst;
        }

        public HTMLItem GetNew()
        {
            var query = Convertor.FromObjectToJson(new { HasProc = false});
            var source = DataStorage.GetInstance(DBType.MongoDB).Get("StockService", "Html", query);
            var res = Convertor.FromDictionaryToObject<HTMLItem>(source);
            return res;
        }


        public int Save( )
        {
 
            try
            {
                this.HasProc = !(null == this.Data);
                var query = Convertor.FromObjectToJson(new { Tag1 = this.Tag1, Tag2 = this.Tag2 });
                DataStorage.GetInstance(DBType.MongoDB).Save3("StockService", "Html", this, query, true);
                LOGGER.Log("成功保存一个文档 "+ query);
                //ThreadManager.Pause(seconds: 1);
            }
            catch(Exception e)
            {
                LOGGER.Log(e.Message);
                return -1;
            }

            return 0;
        }
        public int SaveData(string json)
        {

            try
            {
                var src = Convertor.FromJsonToObject<HTMLItem>(json);
                src.Save();
            }
            catch (Exception e)
            {
                LOGGER.Log(e.Message);
                return -1;
            }

            return 0;
        }
    }
}
