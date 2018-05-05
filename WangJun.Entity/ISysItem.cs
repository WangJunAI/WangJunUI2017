using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public interface ISysItem
    {
        #region 系统级别的信息
         string ClassFullName { get; set; }

         string _DbName { get; set; }

         string _CollectionName { get; set; }

         string _SourceID { get; set; }

         int Version { get; set; }

         string AppName { get; set; }

         long AppCode { get; set; }
        #endregion
    }
}
