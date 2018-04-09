using WangJun.Config;
using WangJun.Entity;
using WangJun.HumanResource;
using WangJun.Utility;

namespace WangJun.YunPan
{
    /// <summary>
    /// 云盘文件实体
    /// </summary>
    public class YunPanItem : BaseItem
    {
        public YunPanItem()
        {
            this._DbName = CONST.APP.YunPan.DB;
            this._CollectionName = CONST.APP.YunPan.TableYunPan;
            this.ClassFullName = this.GetType().FullName;
            this.Version = 1;
            this.AppCode = CONST.APP.YunPan.Code;
            this.AppName = CONST.APP.YunPan.Name;
            this.StatusCode = CONST.APP.YunPan.Status.正常;
            this.Status = CONST.APP.YunPan.Status.GetString(this.StatusCode);

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
                if (0 < this.FileLength / (1024 * 1024 * 1024))
                {
                    return this.FileLength / (1024 * 1024 * 1024) + "GB";
                }
                else if (0 < this.FileLength / (1024 * 1024))
                {
                    return this.FileLength / (1024 * 1024) + "MB";
                }
                else if (0 < this.FileLength / (1024))
                {
                    return this.FileLength / (1024) + "KB";
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

        public static YunPanItem Load(string id)
        {
            var item = new YunPanItem();
            item.ID = id;
            item = EntityManager.GetInstance().Get<YunPanItem>(item);
            return item;
        }

        /// <summary>
        /// 保存
        /// </summary>
        public void Save()
        {
            EntityManager.GetInstance().Save<YunPanItem>(this);
            ClientBehaviorItem.Save(this, ClientBehaviorItem.BehaviorType.修改, SESSION.Current);
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
                var property = inst.GetType().GetProperty(kv.Key);
                if (property.CanWrite)
                {
                    property.SetValue(inst, kv.Value);
                }
            }
            inst.Name =  inst.Name;///调试用
            inst.Save();

            #region 创建共享文档
            if (null != inst.UserAllowedArray)
            {
                var redirectID = inst.ID;
                foreach (string id in inst.UserAllowedArray)
                {
                    var staff = StaffItem.Load(id);
                    inst.ID = null;
                    inst.Name = inst.Name;
                    inst._RedirectID = redirectID;
                    inst.OwnerID = id;
                    inst.Save();
                }
            }
            #endregion        }
        }
 

    }
}
