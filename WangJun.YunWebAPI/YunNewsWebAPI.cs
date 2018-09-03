﻿using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using WangJun.App;
using WangJun.Entity;
using WangJun.Net;
using WangJun.Utility;
using WangJun.Yun;

namespace WangJun.YunNews
{
    /// <summary>
    /// 
    /// </summary>
    public class YunNewsWebAPI: YunWebAPI
    {
        public YunNewsWebAPI() : base("新闻发布应用", 1803001006, 1)
        {

        } 


        #region 初始化应用
        public int RegisterApp(string companyID,string securityCode)
        {
            var company = YunCompany.Load(companyID);

            #region 初始化目录
            var yunCategory0 = YunCategory.CreateAsNew("企业头条"); ///根目录
            yunCategory0.CompanyID = companyID;
            yunCategory0.CompanyName = company.Name;
            yunCategory0.AppCode = this.CurrentApp.AppCode;
            yunCategory0.AppName = this.CurrentApp.AppName;
            yunCategory0.Version = this.CurrentApp.Version;
            yunCategory0.OwnerID = company.ID;
            yunCategory0.OwnerName = company.Name;
            yunCategory0.Save();

            var yunCategory1 = YunCategory.CreateAsNew("动态"); ///根目录
            yunCategory1.CompanyID = companyID;
            yunCategory1.CompanyName = company.Name;
            yunCategory1.AppCode = this.CurrentApp.AppCode;
            yunCategory1.AppName = this.CurrentApp.AppName;
            yunCategory1.Version = this.CurrentApp.Version;
            yunCategory1.RootID = yunCategory0.ID;
            yunCategory1.RootName = yunCategory0.Name;
            yunCategory1.ParentID = yunCategory0.ID;
            yunCategory1.ParentName = yunCategory0.Name;
            yunCategory1.OwnerID = company.ID;
            yunCategory1.OwnerName = company.Name;
            yunCategory1.Save();

            var yunCategory2 = YunCategory.CreateAsNew("通知");
            yunCategory2.CompanyID = companyID;
            yunCategory2.CompanyName = company.Name;
            yunCategory2.AppCode = this.CurrentApp.AppCode;
            yunCategory2.AppName = this.CurrentApp.AppName;
            yunCategory2.Version = this.CurrentApp.Version;
            yunCategory2.RootID = yunCategory0.ID;
            yunCategory2.RootName = yunCategory0.Name;
            yunCategory2.ParentID = yunCategory0.ID;
            yunCategory2.ParentName = yunCategory0.Name;
            yunCategory2.OwnerID = company.ID;
            yunCategory2.OwnerName = company.Name;
            yunCategory2.Save();

            var yunCategory3 = YunCategory.CreateAsNew("公告"); ///根目录
            yunCategory3.CompanyID = companyID;
            yunCategory3.CompanyName = company.Name;
            yunCategory3.AppCode = this.CurrentApp.AppCode;
            yunCategory3.AppName = this.CurrentApp.AppName;
            yunCategory3.Version = this.CurrentApp.Version;
            yunCategory3.RootID = yunCategory0.ID;
            yunCategory3.RootName = yunCategory0.Name;
            yunCategory3.ParentID = yunCategory0.ID;
            yunCategory3.ParentName = yunCategory0.Name;
            yunCategory3.OwnerID = company.ID;
            yunCategory3.OwnerName = company.Name;
            yunCategory3.Save();

            var yunCategory4 = YunCategory.CreateAsNew("热点"); ///自动化聚集
            yunCategory4.CompanyID = companyID;
            yunCategory4.CompanyName = company.Name;
            yunCategory4.AppCode = this.CurrentApp.AppCode;
            yunCategory4.AppName = this.CurrentApp.AppName;
            yunCategory4.Version = this.CurrentApp.Version;
            yunCategory4.RootID = yunCategory0.ID;
            yunCategory4.RootName = yunCategory0.Name;
            yunCategory4.ParentID = yunCategory0.ID;
            yunCategory4.ParentName = yunCategory0.Name;
            yunCategory4.OwnerID = company.ID;
            yunCategory4.OwnerName = company.Name;
            yunCategory4.Save();

            var yunCategory5 = YunCategory.CreateAsNew("关于"); ///根目录
            yunCategory5.CompanyID = companyID;
            yunCategory5.CompanyName = company.Name;
            yunCategory5.AppCode = this.CurrentApp.AppCode;
            yunCategory5.AppName = this.CurrentApp.AppName;
            yunCategory5.Version = this.CurrentApp.Version;
            yunCategory5.RootID = yunCategory0.ID;
            yunCategory5.RootName = yunCategory0.Name;
            yunCategory5.ParentID = yunCategory0.ID;
            yunCategory5.ParentName = yunCategory0.Name;
            yunCategory5.OwnerID = company.ID;
            yunCategory5.OwnerName = company.Name;
            yunCategory5.Save();
            #endregion

            #region 初始化第一篇文章

            #endregion

            return (int)EnumResult.成功;
        }
        #endregion
        

        #region 文档操作
        /// <summary>
        /// 保存一个目录
        /// </summary>
        /// <param name="name"></param>
        /// <param name="parentId"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public int SaveEntity(string jsonInput)
        {
            var ar = Convertor.FromJsonToObject2<YunArticle>(jsonInput);
            ar.AppCode = this.CurrentApp.AppCode;
            ar.AppName = this.CurrentApp.AppName;
            ar.Version = this.CurrentApp.Version;

            if (string.IsNullOrWhiteSpace(ar.ImageUrl))
            {
                ar.ImageUrl = YunAI.GetInstance().GetPicByKeyword(ar.Title);
            }
            ar.OwnerID = SESSION.Current.CompanyID;
            ar.OwnerName = SESSION.Current.CompanyName;

            ar.Save();



            return 0;
        }


        #endregion

        #region 回收站
        public List<YunArticle> LoadRecycleBinEntityList(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50)
        {
            ///MongoDB
            query = "{$and:[" + "{}" + ",{'OwnerID':'" + SESSION.Current.CompanyID + "','AppCode':" + this.AppCode + "},{'StatusCode':{$eq:" + (int)EnumStatus.删除 + "}}]}";
            var res = EntityManager.GetInstance().Find<YunArticle>(query, protection, sort, pageIndex, pageSize);

            /// SQLServer
            var res2 = EntityManager.GetInstance().Find<YunArticle>(p => p.CompanyID == SESSION.Current.CompanyID && p.AppCode == this.AppCode && p.StatusCode == (int)EnumStatus.删除, p => p.CreateTime, pageIndex, pageSize, true).ToList();

            return res;

        }
        #endregion



        #region 统计操作
        /// <summary>
        /// 统计操作
        /// </summary>
        /// <returns></returns>
        public object Count(string json)
        {
            ///MongoDB
            var item = new YunArticle();
            var match = "{$match:" + json + "}";
            var group = "{$group:{_id:'YunArticle',Count:{$sum:1}}}";
            var res = EntityManager.GetInstance().Aggregate(item._DbName, item._CollectionName, match, group);

            /// SQLServer
            var res2 = EntityManager.GetInstance().Count<YunArticle>(p => p.CompanyID == SESSION.Current.CompanyID && p.AppCode == this.AppCode);
            return res;
        }
        #endregion

         




          
         
         

    }
}
