using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.DB;
using WangJun.Utility;

namespace WangJun.HTML
{
    public class HTMLItem
    {
        public string TaskID { get; set; }

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

        public DateTime CreateTime {get;set;}

        
        public HTMLItem GetNew()
        {
            var query = Convertor.FromObjectToJson(new { HasProc = false });
            var source = DataStorage.GetInstance(DBType.MongoDB).Get("StockService", "Html", query);
            var res = Convertor.FromDictionaryToObject<HTMLItem>(source);
            return res;
        }


        public int Save()
        {
            this.TaskID = (Guid.Empty.ToString() == this.TaskID) ? Guid.NewGuid().ToString() : this.TaskID;
            this.HasProc = !(null == this.Data);
            var query = Convertor.FromObjectToJson(new { TaskID = this.TaskID });
            DataStorage.GetInstance(DBType.MongoDB).Save3("StockService", "Html", this, query, true);
            return 0;
        }
    }
}
