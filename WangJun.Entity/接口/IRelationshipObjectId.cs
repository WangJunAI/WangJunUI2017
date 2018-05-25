using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public interface IRelationshipObjectId
    {
          ObjectId _id { get; set; }
         ObjectId _OID { get; set; }

         string ID { get; set; }


         ObjectId _ParentOID { get; set; }



         string ParentID { get; set; }

         ObjectId _RootOID { get; set; }


         string RootID { get; set; }
    }
}
