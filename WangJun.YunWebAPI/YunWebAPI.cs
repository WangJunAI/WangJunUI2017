using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Entity;
using WangJun.Utility;

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
    }
}
