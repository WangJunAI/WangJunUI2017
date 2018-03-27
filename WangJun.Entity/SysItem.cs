using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public class SysItem
    {
        #region 系统级别的信息
        public string ClassFullName { get; set; }

        public string _DbName { get; set; }

        public string _CollectionName { get; set; }

        public string _SourceID { get; set; }

        public int Version { get; set; }

        public string AppName { get; set; }

        public long AppCode { get; set; }
        #endregion
    }
}
