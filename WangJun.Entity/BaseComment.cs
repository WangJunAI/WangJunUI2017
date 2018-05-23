using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public class BaseComment : IComment, IRelationshipInt64,ITime,ICount , IEntity,IApp
    {

        #region IComment
        public long ID { get { return this._ID64; } set { this._ID64 = value; } } 

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
        public virtual int Save()
        {

            return 0;

        }
        public virtual int Remove() { return 0; }

        public virtual int Load() { return 0; }
        #endregion


        #region ISysItem
        public string ClassFullName { get; set; }

        public string _DbName { get; set; }

        public string _CollectionName { get; set; }

        public string _SourceID { get; set; }

        #endregion

        #region 基本方法
        public static BaseComment CreateAsText()
        {
            var inst = new BaseComment();

            var iArticle = inst as IComment;
            iArticle.ContentType = "text";

            var iTime = inst as ITime;
            iTime.CreateTime = DateTime.Now;
            iTime.UpdateTime = iTime.CreateTime; 
            return inst;
        }

        public static BaseComment CreateAsLike()
        {
            var inst = new BaseComment();

            var iArticle = inst as IComment;
            iArticle.ContentType = "like";

            var iTime = inst as ITime;
            iTime.CreateTime = DateTime.Now;
            iTime.UpdateTime = iTime.CreateTime;
            return inst;
        }

        public static BaseComment CreateAsFavorite()
        {
            var inst = new BaseComment();

            var iArticle = inst as IComment;
            iArticle.ContentType = "favorite";

            var iTime = inst as ITime;
            iTime.CreateTime = DateTime.Now;
            iTime.UpdateTime = iTime.CreateTime;
            return inst;
        }
        #endregion
    }
}
