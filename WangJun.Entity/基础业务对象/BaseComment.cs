﻿using MongoDB.Bson;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Utility;

namespace WangJun.Entity
{
    public class BaseComment : IComment, IRelationshipGuid, IRelationshipObjectId, ITime,ICount , IEntity,IApp,ICompany,ISysItem,IStatus, IOperator
    {
        public int Level { get; set; }

        #region IComment 

        public string Content { get; set; }

        public string ContentType { get; set; }
        #endregion

        #region IRelationshipInt64
        [Key]
        public Guid _GID { get; set; }

        public Guid _ParentGID { get; set; }

        public Guid _RootGID { get; set; }
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

 
        #endregion

        #region ICompany
        public string CompanyID { get; set; }
        public string CompanyName { get; set; }
        #endregion

        #region IStatus
        public string Status { get; set; }

        public int StatusCode { get; set; }
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

        #region IPermission 
        public Guid PermissionGroupID { get; set; }

        public string PermissionGroupName { get; set; }
        #endregion

        #region 权限控制
        [NotMapped]
        public ArrayList OrgAllowedArray { get; set; }
        [NotMapped]
        public string OrgAllowedArrayText { get; set; }
        [NotMapped]
        public ArrayList UserAllowedArray { get; set; }
        [NotMapped]
        public string UserAllowedArrayText { get; set; }
        [NotMapped]
        public ArrayList RoleAllowedArray { get; set; }
        [NotMapped]
        public string RoleAllowedArrayText { get; set; }
        [NotMapped]
        public ArrayList OrgDeniedArray { get; set; }
        [NotMapped]
        public string OrgDeniedArrayText { get; set; }
        [NotMapped]
        public ArrayList UserDeniedArray { get; set; }
        [NotMapped]
        public string UserDeniedArrayText { get; set; }
        [NotMapped]
        public ArrayList RoleDeniedArray { get; set; }
        [NotMapped]
        public string RoleDeniedArrayText { get; set; }
        [NotMapped]
        public string _RedirectID { get; set; }

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
