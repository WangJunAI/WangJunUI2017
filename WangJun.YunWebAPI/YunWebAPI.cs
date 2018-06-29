using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Entity;
using WangJun.Utility;
using WangJun.Yun;

namespace WangJun.App
{
    public class YunWebAPI: IApp
    {
        public YunWebAPI(string appName,long appCode,long Version) {
            this.AppName = appName;
            this.AppCode =appCode;
            this.Version = Version;
        }

        #region  IApp
        public long Version { get; set; }

        public string AppName { get; set; }

        public long AppCode { get; set; }
        public IApp CurrentApp { get { return (this as IApp); } }
        #endregion

        #region 服务状态检测
        public object APICheck(string input)
        {
            var inst =  new { AppCode = this.AppCode, AppName = this.AppName, Version = this.Version };
            return inst;
        }
        #endregion

        #region 管理账号操作
        public int SetManagerID(string userID,bool canManage)
        { 

            var user = YunUser.Load(userID);
            var per1 = new YunPermission { };
            per1.Allow = true;
            per1.OperatorID = user._GID;
            per1.OperatorName = user.Name;
            per1.OperatorType = (int)EnumOperatorType.用户;
            per1.AppCode = this.CurrentApp.AppCode;
            per1.AppName = this.CurrentApp.AppName;
            per1.ObjectID = SUID.FromStringToGuid("FFFFFFFFFFFFFF" + this.AppCode);
            per1.ObjectType = (int)EnumObjectType.应用管理;
            per1.ObjectTypeName = EnumObjectType.应用管理.ToString();
            per1.CompanyID = user.CompanyID;
            per1.CompanyName = user.CompanyName;

            var permissionList = YunPermission.LoadAppPermission(userID).Where(p => p.ObjectID == per1.ObjectID && p.ObjectType == per1.ObjectType);
            var isExist = 0<permissionList.Count();
            if (!isExist && canManage)
            {
                per1.Save();
            }
            else if (isExist && !canManage)
            {
                foreach (var permission in permissionList)
                {
                    YunPermission.Remove(permission.ID);
                }
            }

            return (int)EnumResult.成功;
        }
         
        #endregion

        #region 目录操作
        /// <summary>
        /// 保存一个目录
        /// </summary>
        /// <param name="name"></param>
        /// <param name="parentId"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public int SaveCategory(string jsonInput)
        {
            var ar = Convertor.FromJsonToObject2<YunCategory>(jsonInput);
            ar.AppCode = this.CurrentApp.AppCode;
            ar.AppName = this.CurrentApp.AppName;
            ar.Version = this.CurrentApp.Version;

            ar.Save();

            return 0;
        }

        /// <summary>
        /// 加载目录
        /// </summary>
        /// <param name="query"></param>
        /// <param name="protection"></param>
        /// <param name="sort"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public List<YunCategory> LoadCategoryList(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50)
        {
            var dict = Convertor.FromJsonToDict2(query);

            query = "{$and:[" + query + ",{'CompanyID':'" + SESSION.Current.CompanyID + "','AppCode':" + this.CurrentApp.AppCode + "},{'StatusCode':{$eq:" + (int)EnumStatus.正常 + "}}]}";

            ///MongoDB
            var res = EntityManager.GetInstance().Find<YunCategory>(query, protection, sort, pageIndex, pageSize);

            /// SQLServer
            var res2 = EntityManager.GetInstance().Find<YunCategory>(p => p.CompanyID == SESSION.Current.CompanyID && p.AppCode == this.AppCode, p => p.CreateTime, 0, 1000, false).ToList();
            return res;
        }


        /// <summary>
        /// 删除一个目录
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int RemoveCategory(string id)
        {
            YunCategory.Remove(id);
            return 0;
        }

        public YunCategory GetCategory(string id)
        {
            var inst = YunCategory.Load(id);

            return inst;
        }

        #endregion

        #region 文档操作
        public List<YunArticle> LoadEntityList(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50)
        {
            ///MongoDB
            query = "{$and:[" + query + ",{'StatusCode':{$eq:" + (int)EnumStatus.正常 + "}},{'AppCode':" + this.CurrentApp.AppCode + "}]}";
            var res = EntityManager.GetInstance().Find<YunArticle>(query, protection, sort, pageIndex, pageSize);

            /// SQLServer
            var res2 = EntityManager.GetInstance().Find<YunArticle>(p => p.CompanyID == SESSION.Current.CompanyID && p.AppCode == this.AppCode && p.StatusCode == (int)EnumStatus.正常, p => p.CreateTime, pageIndex, pageSize, true);


            return res;
        }


        /// <summary>
        /// 删除一个目录
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int RemoveEntity(string id)
        {
            YunArticle.Remove(id);

            return 0;
        }

        public YunArticle GetEntity(string id)
        {
            var inst = YunArticle.Load(id);
            return inst;
        }
        #endregion

        #region 用户行为 点赞 收藏 阅读
        /// <summary>
        /// 添加点赞行为
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public object AddLikeCount(string id)
        {
            try
            {
                var article = YunArticle.Load(id);
                YunBehavior.Save(operateTypeCode: (int)EnumBehaviorType.点赞, operateType: EnumBehaviorType.点赞.ToString()
                                             , targetTypeCode: (int)EnumBizType.文章, targetType: EnumBizType.文章.ToString()
                                             , operatorID: SUID.FromStringToGuid(SESSION.Current.UserID), operatorName: SESSION.Current.UserName
                                             , targetID: SUID.FromStringToGuid(id), targetName: article.Title
                                             , appCode: this.CurrentApp.AppCode, appName: this.CurrentApp.AppName
                                             , companyID: SESSION.Current.CompanyID, companyName: SESSION.Current.CompanyName);


                return (int)EnumResult.成功;
            }
            catch (Exception e)
            {

            }
            return (int)EnumResult.失败;
        }

        /// <summary>
        /// 添加收藏行为
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public object AddFavoriteCount(string id)
        {
            try
            {
                var article = YunArticle.Load(id);
                YunBehavior.Save(operateTypeCode: (int)EnumBehaviorType.收藏, operateType: EnumBehaviorType.收藏.ToString()
                                         , targetTypeCode: (int)EnumBizType.文章, targetType: EnumBizType.文章.ToString()
                                         , operatorID: SUID.FromStringToGuid(SESSION.Current.UserID), operatorName: SESSION.Current.UserName
                                         , targetID: SUID.FromStringToGuid(id), targetName: article.Title
                                         , appCode: this.CurrentApp.AppCode, appName: this.CurrentApp.AppName
                                         , companyID: SESSION.Current.CompanyID, companyName: SESSION.Current.CompanyName);
                return (int)EnumResult.成功;
            }
            catch (Exception e)
            {

            }
            return (int)EnumResult.失败;
        }

        public int ClientRead(string id)
        {
            try
            {
                var article = YunArticle.Load(id);
                YunBehavior.Save(operateTypeCode: (int)EnumBehaviorType.阅读, operateType: EnumBehaviorType.阅读.ToString()
                             , targetTypeCode: (int)EnumBizType.文章, targetType: EnumBizType.文章.ToString()
                             , operatorID: SUID.FromStringToGuid(SESSION.Current.UserID), operatorName: SESSION.Current.UserName
                             , targetID: SUID.FromStringToGuid(id), targetName: article.Title
                             , appCode: this.CurrentApp.AppCode, appName: this.CurrentApp.AppName
                             , companyID: SESSION.Current.CompanyID, companyName: SESSION.Current.CompanyName);
                return (int)EnumResult.成功;
            }
            catch (Exception e)
            {

            }
            return (int)EnumResult.失败;
        }

        public object GetBehaviorByArticleID(string id)
        {
            var userID = SUID.FromStringToGuid(SESSION.Current.UserID);
            var dataSource = YunBehavior.LoadBehaviorList(id);
            dynamic stat = new ExpandoObject();
            stat.ReadList = dataSource.Where(p => p.OperateTypeCode == (int)EnumBehaviorType.阅读);
            stat.LikeList = dataSource.Where(p => p.OperateTypeCode == (int)EnumBehaviorType.点赞);
            stat.FavoriteList = dataSource.Where(p => p.OperateTypeCode == (int)EnumBehaviorType.收藏);
            stat.CommentList = dataSource.Where(p => p.OperateTypeCode == (int)EnumBehaviorType.参与评论);
            stat.HasLike = 0 < dataSource.Where(p => p.OperateTypeCode == (int)EnumBehaviorType.点赞 && p.OperatorID == userID).Count();
            stat.HasFavorite = 0 < dataSource.Where(p => p.OperateTypeCode == (int)EnumBehaviorType.收藏 && p.OperatorID == userID).Count();
            return stat;
        }

        #endregion

        #region 评论操作
        /// <summary>
        /// 保存一个目录
        /// </summary>
        /// <param name="name"></param>
        /// <param name="parentId"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public int SaveComment(string jsonInput)
        {

            var ar = Convertor.FromJsonToObject2<YunComment>(jsonInput);
            ar.AppCode = this.CurrentApp.AppCode;
            ar.AppName = this.CurrentApp.AppName;
            ar.Version = this.CurrentApp.Version;

            ar.Save();


            return 0;
        }

        /// <summary>
        /// 加载目录
        /// </summary>
        /// <param name="query"></param>
        /// <param name="protection"></param>
        /// <param name="sort"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public List<YunComment> LoadCommentList(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50)
        {
            var dict = Convertor.FromJsonToDict2(query);
            if (dict.ContainsKey("RootID"))
            {
                var rootID = dict["RootID"].ToString();
                query = "{$and:[" + query + ",{'StatusCode':{$eq:" + (int)EnumStatus.正常 + "}}]}";
                var res = EntityManager.GetInstance().Find<YunComment>(query, protection, sort, pageIndex, pageSize);

                /// SQLServer
                var res2 = EntityManager.GetInstance().Find<YunComment>(p => p.RootID == rootID && p.CompanyID == SESSION.Current.CompanyID && p.AppCode == this.AppCode && p.StatusCode == (int)EnumStatus.正常, p => p.CreateTime, pageIndex, pageSize, true);


                return res;
            }
            return new List<YunComment>();
        }


        /// <summary>
        /// 删除一个目录
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int RemoveComment(string id)
        {
            YunComment.Remove(id);

            return 0;
        }

        public YunComment GetComment(string id)
        {
            var inst = YunComment.Load(id);

            return inst;
        }
        #endregion
         
        #region 权限获取
        public object GetPermissionByArticleID(string id)
        {
            var article = YunArticle.Load(id);
            var userID = SUID.FromStringToGuid(SESSION.Current.UserID);

            var dataSource = YunPermission.LoadArticlePermission(SESSION.Current.UserID, id);
            dynamic stat = new ExpandoObject();
            stat.CanRead = 0 < dataSource.Where(p => p.BehaviorType == (int)EnumBehaviorType.分享阅读 && p.OperatorID == userID).Count();
            stat.CanEdit = 0 < dataSource.Where(p => p.BehaviorType == (int)EnumBehaviorType.分享编辑 && p.OperatorID == userID).Count() || article.OwnerID == SESSION.Current.UserID;
            stat.CanDelete = 0 < dataSource.Where(p => p.BehaviorType == (int)EnumBehaviorType.物理删除 && p.OperatorID == userID).Count() || article.OwnerID == SESSION.Current.UserID;
            return stat;
        }
        #endregion

        #region 回收站
        public List<YunArticle> LoadRecycleBinEntityList(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50)
        {
            ///MongoDB
            query = "{$and:[" + "{}" + ",{'OwnerID':'" + SESSION.Current.UserID + "','AppCode':" + this.AppCode + "},{'StatusCode':{$eq:" + (int)EnumStatus.删除 + "}}]}";
            var res = EntityManager.GetInstance().Find<YunArticle>(query, protection, sort, pageIndex, pageSize);

            /// SQLServer
            var res2 = EntityManager.GetInstance().Find<YunArticle>(p => p.CompanyID == SESSION.Current.CompanyID && p.AppCode == this.AppCode && p.StatusCode == (int)EnumStatus.删除, p => p.CreateTime, pageIndex, pageSize, true).ToList();

            return res;

        }

        /// <summary>
        /// 彻底删除实体
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DeleteEntity(string id)
        {
            YunArticle.Delete(id);

            return 0;
        }

        public int EmptyRecycleBin()
        {
            var list = this.LoadRecycleBinEntityList("{}", "{}", "{}", 0, int.MaxValue);
            foreach (YunArticle item in list)
            {
                YunArticle.Delete(item.ID);
            }

            return 0;
        }
        #endregion

        #region 聚合计算
        public object Aggregate(string itemType, string match, string group)
        {
            var iSysItem = new YunArticle() as ISysItem;
            if ("YunBehavior" == itemType)
            {
                iSysItem = Activator.CreateInstance<YunBehavior>() as ISysItem;
            }
            else if ("YunUser" == itemType)
            {
                iSysItem = Activator.CreateInstance<YunUser>() as ISysItem;
            }
            else
            {
                iSysItem = Activator.CreateInstance(Type.GetType(itemType)) as ISysItem;
            }
            var res = EntityManager.GetInstance().Aggregate(iSysItem._DbName, iSysItem._CollectionName, match, group);
            return res;

        }
        #endregion

        #region 消息通知
        public void SendNotice()
        {

        }

        public void LoadNoticeList()
        {

        }

        public void RemoveNotice()
        {

        }
        #endregion

        #region 权限控制
        public virtual bool CanInvoke(string _sid)
        {
            return true;
        }

        public virtual void InvokeOver(dynamic data)
        {

        }
        #endregion

    }
}
