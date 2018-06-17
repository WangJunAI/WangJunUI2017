using System;
using System.Collections.Generic;
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
        #region  IApp
        public long Version { get { return 1; } set { } }

        public string AppName { get { return "基础应用"; } set { } }

        public long AppCode { get { return 1803000000; } set { } }
        public IApp CurrentApp { get { return (this as IApp); } }
        #endregion

        #region 服务状态检测
        public string APICheck(string input)
        {
            return Convertor.FromObjectToJson(this.CurrentApp);
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

    }
}
