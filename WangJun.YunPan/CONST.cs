using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.YunPan
{
    public static class CONST
    {
        public static class DB
        {
            public static string DBName_DocService { get { return "DocService"; } }

            public static string CollectionName_YunPanItem { get { return "YunPanItem"; } }

            public static string CollectionName_CategoryItem { get { return "CategoryItem"; } }




            public static string MongoDBFilterCreator_ByObjectId(string id)
            {
                var filter = "{\"_id\":ObjectId('" + id + "')}";
                return filter;
            }

            public static string MongoDBFilterCreator_ByInc(string filedName, int incValue)
            {
                var filter = "{$inc:{'" + filedName + "':" + incValue + "}}";
                return filter;
            }
        }

        public static class Status {
            public static string Normal  { get { return "已发布"; } }

            public static string Deleted { get { return "已删除"; } }
        }

        public static class ClientBehavior {
            public static string Read { get { return "阅读"; } }

        }


    }
}
