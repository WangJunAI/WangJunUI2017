using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using WangJun.DB;
using WangJun.Entity;
using WangJun.Utility;

namespace WangJun.YunProject
{
    /// <summary>
    /// 文档实体 
    /// </summary>
    public class CategoryItem:BaseItem
    {
        public CategoryItem()
        {
            this._DbName = CONST.DB.DBName_DocService;
            this._CollectionName = CONST.DB.CollectionName_CategoryItem;
            this.GroupName = "文档模板类";
            this.BizMode = "目录服务";
            this.ClassFullName = this.GetType().FullName;

        }
  
         
 

        public int ItemCount { get; set; }

        public int SubCategoryCount { get; set; }

 
 
         
        /// <summary>
        /// [OK]
        /// </summary>
        public void Save()
        {
            EntityManager.GetInstance().Save<CategoryItem>(this);
        }
        public static void Save(string jsonInput)
        {
            var dict = Convertor.FromJsonToDict2(jsonInput);
             var inst = new CategoryItem();
            if(dict.ContainsKey("ID") && null !=dict["ID"])
            {
                inst.ID = dict["ID"].ToString();
            }
            inst = EntityManager.GetInstance().Get<CategoryItem>(inst);
            foreach (var kv in dict)
            {
                inst.GetType().GetProperty(kv.Key).SetValue(inst, kv.Value);
            }
            inst.Save();
        }
        public void Remove()
        {
            EntityManager.GetInstance().Remove(this);

        }

 
    }
}
