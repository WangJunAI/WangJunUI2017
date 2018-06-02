using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Utility;

namespace WangJun.Entity
{
    public class BasePermission : IPermission, ISysItem,ICompany    
    {
        [Key]
        public Guid _ID {get;set;}
        public Guid  GroupID { get; set; }

        public string  GroupName { get; set; }
        public Guid  ObjectID { get; set; }

        public int  ObjectType { get; set; } ///应用,文档,评论,下载,

        public string  ObjectTypeName { get; set; }

        public Guid  OperatorID { get; set; }

        public string  OperatorName { get; set; }

        public int OperatorType { get; set; }

        public bool  Allow { get; set; }

        #region ISysItem
        public string ID { get { return SUID.FromGuidToObjectId(this._ID).ToString(); } set { this._ID = SUID.FromStringToGuid(value); } }
        public string ClassFullName { get; set; }

        public string _DbName { get; set; }

        public string _CollectionName { get; set; }

        public string _SourceID { get; set; }

        #endregion
        #region  IApp
        public long Version { get; set; }

        public string AppName { get; set; }

        public long AppCode { get; set; }
        #endregion

        #region ICompany
        public string CompanyID { get; set; }
        public string CompanyName { get; set; }
        #endregion
    }
}
