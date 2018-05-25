using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace WangJun.Utility
{
    public static class SUID
    { 
        public static Guid New()
        {
            var src = ObjectId.GenerateNewId();
            return SUID.FromObjectIdToGuid(src);
        }

        public static Guid FromObjectIdToGuid(ObjectId src)
        {
            var temp = src.ToByteArray();
            var targetArray = new byte[16];
            for (int k = 4; k < targetArray.Length; k++)
            {
                targetArray[k] = temp[k - 4];
            }
            var target = GuidConverter.FromBytes(targetArray, GuidRepresentation.CSharpLegacy);
            return target;
        }
    }
}
