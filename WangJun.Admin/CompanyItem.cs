using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using WangJun.Config;
using WangJun.DB;
using WangJun.Entity;
using WangJun.Utility;

namespace WangJun.Admin
{
    /// <summary>
    /// 公司实体 
    /// </summary>
    public class CompanyItem : BaseItem
    {
        public CompanyItem()
        {
            this._DbName = CONST.APP.OrgStaff.DB;
            this._CollectionName = CONST.APP.OrgStaff.TableCompany;
            this.ClassFullName = this.GetType().FullName;
            this.Version = 1;
            this.AppCode = CONST.APP.OrgStaff.Code;
            this.AppName = CONST.APP.OrgStaff.Name;

        }
 
        public string SuperAdminEmail { get; set; }


        #region 实体保存
        /// <summary>
        /// [OK]
        /// </summary>
        public void Save()
        {
            EntityManager.GetInstance().Save<CompanyItem>(this);
        }

        public static void Save(string jsonInput)
        {
            var dict = Convertor.FromJsonToDict2(jsonInput);
            var inst = new CompanyItem();
            if (dict.ContainsKey("ID") && null != dict["ID"])
            {
                inst.ID = dict["ID"].ToString();
            }
            inst = EntityManager.GetInstance().Get<CompanyItem>(inst);
            foreach (var kv in dict)
            {
                var property = inst.GetType().GetProperty(kv.Key);

                if (typeof(DateTime) == property.PropertyType)
                {
                    property.SetValue(inst, DateTime.Parse(kv.Value.ToString()));
                }
                else if (null != kv.Value && typeof(string) == kv.Value.GetType())
                {
                    property.SetValue(inst, kv.Value.ToString().Trim());
                }
                else
                {
                    property.SetValue(inst, kv.Value);
                }

            }
            inst.Save();
        }
        #endregion

        #region 实体移除
        public void Remove()
        {
            EntityManager.GetInstance().Remove(this);

        }
        #endregion


    }
}
