using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using WangJun.DB;
using WangJun.Entity;
using WangJun.Utility;

namespace WangJun.YunPan
{
    /// <summary>
    /// 云盘文件实体
    /// </summary>
    public class YunPanItem: BaseItem
    {
        public YunPanItem()
        {
            this._DbName = CONST.DB.DBName_DocService;
            this._CollectionName = CONST.DB.CollectionName_YunPanItem;
             this.ClassFullName = this.GetType().FullName;
            this.Version = 1;
            this.AppCode = Entity.CONST.APP.YunPan;
            this.AppName = Entity.CONST.APP.GetString(this.AppCode);
        } 
         
        public string Keyword { get; set; }
           
         public int DownloadCount { get; set; }

        public int CollectCount { get; set; }
 
        public string ImageUrl { get; set; }

        /// <summary>
        /// 文件大小
        /// </summary>
        public long FileLength { get; set; }

        public string FileLengthText
        {
            get
            {
                if(0<this.FileLength/(1024*1024*1024))
                {
                    return this.FileLength / (1024 * 1024 * 1024) + "GB";
                }
                else if (0 < this.FileLength / (1024 * 1024 ))
                {
                    return this.FileLength / (1024 * 1024 ) + "MB";
                }
                else if (0 < this.FileLength / (1024 ))
                {
                    return this.FileLength / (1024 ) + "KB";
                }
                return this.FileLength + "B";
            }
        }

         
        /// <summary>
        /// 文件下载查看路径
        /// </summary>
        public string FileHttpUrl { get; set; }

        public string ServerFileName { get; set; }
 
 
        /// <summary>
        /// 文件夹/文件类型
        /// </summary>
        public string FileType { get; set; }


        /// <summary>
        /// 保存
        /// </summary>
        public void Save()
        {
            EntityManager.GetInstance().Save<YunPanItem>(this);
        }
        public static void Save(string jsonInput)
        {
            var dict = Convertor.FromJsonToDict2(jsonInput);
            var inst = new YunPanItem();
            if (dict.ContainsKey("ID") && null != dict["ID"])
            {
                inst.ID = dict["ID"].ToString();
            }
            inst = EntityManager.GetInstance().Get<YunPanItem>(inst);
            foreach (var kv in dict)
            {
                inst.GetType().GetProperty(kv.Key).SetValue(inst, kv.Value);
            }
            inst.Save();
        }

        /// <summary>
        /// 删除
        /// </summary>
        public void Remove()
        {
            EntityManager.GetInstance().Remove(this);

        }

    }
}
