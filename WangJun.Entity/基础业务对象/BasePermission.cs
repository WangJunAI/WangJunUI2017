using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Utility;

namespace WangJun.Entity
{
    public class BasePermission : IPermission, ISysItem,ICompany    ,ITime
    {
        [Key]
        public Guid _ID
        {
            get
            {
                return
                    SUID.CreateNewID(new Guid[] { this.ObjectID, this.OperatorID });
            }
            set { }
        }
        public Guid  GroupID { get; set; }

        public string  GroupName { get; set; }
        public Guid  ObjectID { get; set; }

        public int  ObjectType { get; set; } ///应用,文档,评论,下载,

        public string  ObjectTypeName { get; set; }

        public Guid  OperatorID { get; set; }

        public string  OperatorName { get; set; }

        public int OperatorType { get; set; }

        public bool  Allow { get; set; }

        public int BehaviorType { get; set; }

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

        #region ITime
        [Column(TypeName = "datetime2")]
        public DateTime CreateTime { get; set; }
        [Column(TypeName = "datetime2")]
        public DateTime UpdateTime { get; set; }
        [Column(TypeName = "datetime2")]
        public DateTime DeleteTime { get; set; }
        #endregion
    }
}
