﻿using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Entity;
using WangJun.Utility;

namespace WangJun.Yun
{
    public class YunComment : BaseComment
    {
        public YunComment() {
            var iSysItem = this as ISysItem;
            iSysItem.ClassFullName = this.GetType().FullName;
            iSysItem._DbName = "WangJun";
            iSysItem._CollectionName = "YunComment";

        } 
        public   int Save()
        {
            var session = SESSION.Current;
            var iRelationshipObjectId = this as IRelationshipObjectId;
            var iTime = this as ITime;
            var iOperator = this as IOperator;
            var iCompany = this as ICompany;
            var iStatus = this as IStatus;
            var iSysItem = this as ISysItem;


            #region iRelationshipObjectId
            if (null != iRelationshipObjectId && iRelationshipObjectId._OID == ObjectId.Empty) ///新对象
            {
                iRelationshipObjectId._OID = ObjectId.GenerateNewId();
            }
            #endregion

            #region ITime
            if (null != iTime && iTime.CreateTime == DateTime.MinValue) ///新对象
            {
                iTime.CreateTime = DateTime.Now;
                iTime.UpdateTime = DateTime.Now;
            }
            #endregion

            #region IOperator
            if (null != iOperator && string.IsNullOrWhiteSpace(iOperator.CreatorID)) ///新对象
            {
                iOperator.CreatorID = session.UserID;
                iOperator.CreatorName = session.UserName;
                iOperator.ModifierID = session.UserID;
                iOperator.ModifierName = session.UserName;
                if (StringChecker.IsZeroString(iOperator.OwnerID)) ///企业的应该界面赋值
                {
                    iOperator.OwnerID = session.UserID; ///数据所有者
                    iOperator.OwnerName = session.UserName;
                }
            }
            #endregion

            #region ICompany
            if (null != iCompany && string.IsNullOrWhiteSpace(iCompany.CompanyID))
            {
                iCompany.CompanyID = session.CompanyID;
                iCompany.CompanyName = session.CompanyName;
            }
            #endregion

            #region IStatus
            if (null != iStatus && string.IsNullOrWhiteSpace(iStatus.Status))
            {
                iStatus.StatusCode = (int)EnumStatus.正常;
                iStatus.Status = EnumStatus.正常.ToString();
            }
            #endregion

            #region iSysItem
            if (null != iSysItem)
            {
                EntityManager.GetInstance().Save<YunComment>(this);
                return (int)EnumResult.成功;
            }
            #endregion

            return (int)EnumResult.失败;
        }

        public static YunComment Load(string id)
        {
            var res = EntityManager.GetInstance().Get<YunComment>(id);
            return res;
        }

        public static int Remove(string id)
        {
            return EntityManager.GetInstance().Remove<YunComment>(id);
        }

        public static int Delete(string id)
        {
            return EntityManager.GetInstance().DeleteOne<YunComment>(id);
        }

        #region 基本方法
        public static YunComment CreateAsText(IApp app,string content)
        {
            var inst = new YunComment();

            var iComment = inst as IComment;
            iComment.ContentType = "text";
            iComment.Content = content;

            var iApp = inst as IApp;
            iApp.AppCode = app.AppCode;
            iApp.AppName = app.AppName;
            iApp.Version = app.Version;

            var iTime = inst as ITime;
            iTime.CreateTime = DateTime.Now;
            iTime.UpdateTime = iTime.CreateTime;
             


            return inst;
        }
        #endregion
    }
}
