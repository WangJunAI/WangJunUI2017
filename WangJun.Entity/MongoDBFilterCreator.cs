using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public static class MongoDBFilterCreator
    {
        public static string SearchByObjectId(string id)
        {
            var filter = "{\"_id\":ObjectId('" + id + "')}";
            return filter;
        }

        public static string SearchByGuid(string keyName,string value)
        {
            var filter = string.Format("{{'{0}':UUID('{1}')}}", keyName, value);
            return filter;
        }

        public static string ByInc(string filedName, int incValue)
        {
            var filter = "{$inc:{'" + filedName + "':" + incValue + "}}";
            return filter;
        }
    }
}
