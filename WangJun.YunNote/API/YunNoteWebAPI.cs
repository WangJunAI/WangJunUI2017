using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Config;
using WangJun.Entity;
using WangJun.HumanResource;
using WangJun.Utility;

namespace WangJun.YunNote
{
    /// <summary>
    /// 
    /// </summary>
    public class YunNoteWebAPI
    {
        public long AppCode = CONST.APP.YunNote.Code;


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
            CategoryItem.Save(jsonInput);
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
        public List<CategoryItem> LoadCategoryList(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50)
        {
            var dict = Convertor.FromJsonToDict2(query);
            if (dict.ContainsKey("OwnerID") && dict["OwnerID"].ToString() == SESSION.Current.CompanyID) ///企业云盘查询
            {
                dict.Remove("OwnerID");
                query = Convertor.FromObjectToJson(dict);
                query = "{$and:[" + query + ",{'OwnerID':'" + SESSION.Current.CompanyID + "','AppCode':" + this.AppCode + "},{'StatusCode':{$ne:" + CONST.APP.Status.删除 + "}}]}";
            }
            else ///个人查询
            {
                query = "{$and:[" + query + ",{'OwnerID':'" + SESSION.Current.UserID + "','AppCode':" + this.AppCode + "},{'StatusCode':{$ne:" + CONST.APP.Status.删除 + "}}]}";
            }
            var res = EntityManager.GetInstance().Find<CategoryItem>(query, protection, sort, pageIndex, pageSize);
            return res;
        }


        /// <summary>
        /// 删除一个目录
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int RemoveCategory(string id)
        {
            var inst = new CategoryItem();
            inst.ID = id;
            inst.Remove();
            return 0;
        }

        public CategoryItem GetCategory(string id)
        {
            var inst = new CategoryItem();
            inst.ID = id;
            inst = EntityManager.GetInstance().Get<CategoryItem>(inst);
            return inst;
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
            YunNoteItem.Save(jsonInput);
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
        public List<YunNoteItem> LoadEntityList(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50)
        {
            query = "{$and:[" + query + ",{'StatusCode':{$ne:" + CONST.APP.Status.删除 + "}}]}";

            var res = EntityManager.GetInstance().Find<YunNoteItem>(query, protection, sort, pageIndex, pageSize);
            return res;
        }


        /// <summary>
        /// 删除一个目录
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int RemoveEntity(string id)
        {
            var inst = new YunNoteItem();
            inst.ID = id;
            inst.Remove();
            return 0;
        }

        public YunNoteItem GetEntity(string id)
        {
            var inst = new YunNoteItem();
            inst.ID = id;
            inst = EntityManager.GetInstance().Get<YunNoteItem>(inst);
            return inst;
        }
        #endregion



        #region 统计操作
        /// <summary>
        /// 统计操作
        /// </summary>
        /// <returns></returns>
        public object Count(string json)
        {
            var item = new YunNoteItem();
            var match = "{$match:" + json + "}";

            var group = "{$group:{_id:'YunNoteItem总数',Count:{$sum:1}}}";
            var res = EntityManager.GetInstance().Aggregate(item._DbName, item._CollectionName, match, group);
            return res;
        }
        #endregion


        #region 回收站
        public List<YunNoteItem> LoadRecycleBinEntityList(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50)
        {
            query = "{$and:[" + "{}" + ",{'OwnerID':'" + SESSION.Current.UserID + "','AppCode':" + this.AppCode + "},{'StatusCode':{$eq:" + CONST.APP.Status.删除 + "}}]}";

            var res = EntityManager.GetInstance().Find<YunNoteItem>(query, protection, sort, pageIndex, pageSize);
            return res;
        }

        /// <summary>
        /// 彻底删除实体
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DeleteEntity(string id)
        {
            var inst = new YunNoteItem();
            inst.ID = id;
            inst.Delete();
            return 0;
        }

        public int EmptyRecycleBin()
        {
            var list = this.LoadRecycleBinEntityList("{}", "{}", "{}", 0, int.MaxValue);
            foreach (YunNoteItem item in list)
            {
                item.Delete();
            }
            return 0;
        }
        #endregion


    }
}
