using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Utility;

namespace WangJun.Entity
{
    public class BaseBehavior : ICompany, ISysItem
    {
        [Key]
        public Guid _GID{ get; set; }
        public int OperateTypeCode { get; set; }///点赞，收藏

        public string OperateType { get; set; }///点赞，收藏
        public int TargetTypeCode { get; set; }///评论，文件，文章,其他业务类型

        public string TargetType { get; set; }///评论，文件，文章,其他业务类型

        public Guid OperatorID { get; set; }

        public string OperatorName { get; set; }

        public Guid TargetID { get; set; }

        public string TargetName { get; set; }

        #region ISysItem
        public string ClassFullName { get; set; }

        public string _DbName { get; set; }

        public string _CollectionName { get; set; }

        public string ID { get { return SUID.FromGuidToObjectId(this._GID).ToString(); } set { this._GID = SUID.FromStringToGuid(value); } }

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

        public DateTime CreateTime{get;set;}

        public void Save()
        {

        }
    }
}
