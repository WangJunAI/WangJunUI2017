﻿using WangJun.Config;
using WangJun.Entity;
using WangJun.Utility;

namespace WangJun.YunQun
{
    /// <summary>
    /// 云笔记目录 
    /// </summary>
    public class CategoryItem:BaseItem
    {
        public CategoryItem()
        {
            this._DbName = CONST.APP.YunQun.DB;
            this._CollectionName = CONST.APP.YunQun.TableCategory;
            this.ClassFullName = this.GetType().FullName;
            this.Version = 1;
            this.AppCode = CONST.APP.YunQun.Code;
            this.AppName = CONST.APP.YunQun.Name;
            this.StatusCode = CONST.APP.YunQun.Status.正常;
            this.Status = CONST.APP.YunQun.Status.GetString(this.StatusCode);
        }
  

 
        public int ItemCount { get; set; }

        public int SubCategoryCount { get; set; }

  
        /// <summary>
        /// [OK]
        /// </summary>
        public void Save()
        {
            EntityManager.GetInstance().Save<CategoryItem>(this);
            ClientBehaviorItem.Save(this, ClientBehaviorItem.BehaviorType.修改, SESSION.Current);
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
                var property = inst.GetType().GetProperty(kv.Key);
                if (property.CanWrite)
                {
                    property.SetValue(inst, kv.Value);
                }
            }
            inst.Save();
        } 

 
    }
}
