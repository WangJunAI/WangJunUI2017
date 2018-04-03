using WangJun.Config;
using WangJun.Entity;
using WangJun.Utility;

namespace WangJun.YunNews
{
    /// <summary>
    /// 云笔记目录 
    /// </summary>
    public class CategoryItem:BaseItem
    {
        public CategoryItem()
        {
            this._DbName = CONST.APP.YunNews.DB;
            this._CollectionName = CONST.APP.YunNews.TableCategory;
            this.ClassFullName = this.GetType().FullName;
            this.Version = 1;
            this.AppCode = CONST.APP.YunNews.Code;
            this.AppName = CONST.APP.YunNews.Name;
            this.StatusCode = CONST.APP.YunNews.Status.待发布;
            this.Status = CONST.APP.YunNews.Status.GetString(this.StatusCode);
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
        public void Remove()
        {
            EntityManager.GetInstance().Remove(this);

        }

        public static CategoryItem Load(string id)
        {
            var item = new CategoryItem();
            item.ID = id;
            item = EntityManager.GetInstance().Get<CategoryItem>(item);
            return item;
        }


    }
}
