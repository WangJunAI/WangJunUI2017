using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Entity;
using WangJun.Utility;
using WangJun.YunNews;

namespace WangJun.EntityHostApp
{
    class Program
    {
        static void Main(string[] args)
        {
            var i = new BaseItem { _OID = ObjectId.GenerateNewId() ,Name="OK"} ;
            dynamic dy = new ExpandoObject();
            dy.ID = 999;
            EntityManager.GetInstance<BaseItem>().Save(i);
        }
    }
}
