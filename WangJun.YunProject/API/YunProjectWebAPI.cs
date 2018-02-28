using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Entity;
using WangJun.HumanResource;

namespace WangJun.YunProject
{
    /// <summary>
    /// 
    /// </summary>
    public class YunProjectWebAPI
    {
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
            var res = EntityManager.GetInstance().Find<CategoryItem>(CONST.DB.DBName_DocService, CONST.DB.CollectionName_CategoryItem, query, protection, sort, pageIndex, pageSize);
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
            ProjectItem.Save(jsonInput);
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
        public List<ProjectItem> LoadEntityList(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50)
        {
            var res = EntityManager.GetInstance().Find<ProjectItem>(WangJun.YunProject.CONST.DB.DBName_DocService, WangJun.YunProject.CONST.DB.CollectionName_YunProjectItem, query, protection, sort, pageIndex, pageSize);
            return res;
        }


        /// <summary>
        /// 删除一个目录
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int RemoveEntity(string id)
        {
            var inst = new ProjectItem();
            inst.ID = id;
            inst.Remove();
            return 0;
        }

        public ProjectItem GetEntity(string id)
        {
            var inst = new ProjectItem();
            inst.ID = id;
            inst = EntityManager.GetInstance().Get<ProjectItem>(inst);
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
            var item = new ProjectItem();
            var match = "{$match:{}}";
            var group = "{$group:{_id:'ProjectItem总数',Count:{$sum:1}}}";
            var res = EntityManager.GetInstance().Aggregate(item._DbName, item._CollectionName, match, group);
            return res;
        }
        #endregion





        /// <summary>
        /// ///////////////////////
    }
}
