using MongoDB.Bson;
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
    public class BaseArticle: IArticle, IRelationshipGuid,ITime,ICount ,IApp, IEntity,ICompany, IRelationshipObjectId
    {

        #region IArticle
        public string Title { get; set; }

        public string Summary { get; set; }

        public string Content { get; set; }

        public string ContentType { get; set; }
        #endregion

        #region IRelationshipIntGuid
        [Key]
        public Guid _GID { get; set; }

        public Guid _ParentGID { get; set; }

        public Guid _RootGID { get; set; }
        #endregion

        #region IRelationshipObjectId
        [NotMapped]
        public ObjectId _id { get; set; }
        [NotMapped]
        public ObjectId _OID { get { return this._id; } set { this._id = value; this._GID = SUID.FromObjectIdToGuid(this._id); } }

        public string ID
        {
            get
            {
                return this._OID.ToString();
            }
            set
            {
                if (StringChecker.IsObjectId(value))
                {
                    this._OID = ObjectId.Parse(value);
                }
                else
                {
                    this._OID = ObjectId.Empty;
                }
            }
        }

        [NotMapped]
        public ObjectId _ParentOID { get; set; }



        public string ParentID
        {
            get
            {
                return this._ParentOID.ToString();
            }
            set
            {
                if (StringChecker.IsObjectId(value))
                {
                    this._ParentOID = ObjectId.Parse(value);
                    this._ParentGID = SUID.FromObjectIdToGuid(this._ParentOID);
                }
            }
        }
        [NotMapped]
        public ObjectId _RootOID { get; set; }


        public string RootID
        {
            get
            {
                return this._RootOID.ToString();
            }
            set
            {
                if (StringChecker.IsObjectId(value))
                {
                    this._RootOID = ObjectId.Parse(value);
                    this._RootGID = SUID.FromObjectIdToGuid(this._RootOID);
                }
            }
        }
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

        #region IPermission 
        public Guid PermissionGroupID { get; set; }

        public string PermissionGroupName { get; set; }
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
