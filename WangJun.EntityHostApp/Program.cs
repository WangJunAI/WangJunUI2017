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
            var res = SUID.FromObjectIdToGuid(ObjectId.GenerateNewId());
        }
    }
}
