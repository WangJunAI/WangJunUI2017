using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public class BaseArticle: IArticle, IRelationshipInt64,ITime,ICount ,IApp, IEntity,ICompany
    {

        #region IArticle
        public long ID { get { return this._ID64; } set { this._ID64 = value; } }
        public string Title { get; set; }

        public string Summary { get; set; }

        public string Content { get; set; }

        public string ContentType { get; set; }
        #endregion

        #region IRelationshipInt64
        [Key]
        public long _ID64 { get; set; }

        public long _ParentID64 { get; set; }

        public long _RootID64 { get; set; }
        #endregion

        #region ITime
        [Column(TypeName = "datetime2")]
        public DateTime CreateTime { get; set; }
        [Column(TypeName = "datetime2")]
        public DateTime UpdateTime { get; set; }
        [Column(TypeName = "datetime2")]
        public DateTime DeleteTime { get; set; }
        #endregion

        #region ICount
        public int ReadCount { get; set; }

        public int LikeCount { get; set; }

        public int FavoriteCount { get; set; }

        public int CommentCount { get; set; }

        public int DownloadCount { get; set; }
        #endregion

        #region IOperator

        public string CreatorID { get; set; }

        public string CreatorName { get; set; }

        public string ModifierID { get; set; }

        public string ModifierName { get; set; }
        public string OwnerID { get; set; }

        public string OwnerName { get; set; }
        #endregion

        #region  IApp
        public long Version { get; set; }

        public string AppName { get; set; }

        public long AppCode { get; set; }
        #endregion

        #region IEntity
        public virtual int Save() {
             
            return 0;

        }
        public virtual int Remove() { return 0; }

        public virtual int Load() { return 0; }
        #endregion

        #region ICompany
        public string CompanyID { get; set; }
        public string CompanyName { get; set; }
        #endregion

        #region IStatus
        public string Status { get; set; }

        public int StatusCode { get; set; }
        #endregion 

        #region 基本方法
        public static BaseArticle CreateAsHtml()
        {
            var inst = new BaseArticle();

            var iArticle = inst as IArticle;
            iArticle.ContentType = "html";

            var iTime = inst as ITime;
            iTime.CreateTime = DateTime.Now;
            iTime.UpdateTime = iTime.CreateTime;


            return inst;
        }
        #endregion
    }
}
