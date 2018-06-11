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
            var srcArray = src.ToByteArray();
            var targetArray = new byte[16];
            targetArray[4] = srcArray[1];
            targetArray[5] = srcArray[0];
            targetArray[6] = srcArray[3];
            targetArray[7] = srcArray[2];
            targetArray[8] = srcArray[4];
            targetArray[9] = srcArray[5];
            targetArray[10] = srcArray[6];
            targetArray[11] = srcArray[7];
            targetArray[12] = srcArray[8];
            targetArray[13] = srcArray[9];
            targetArray[14] = srcArray[10];
            targetArray[15] = srcArray[11];

            var target = GuidConverter.FromBytes(targetArray, GuidRepresentation.CSharpLegacy);
            return target;
        }

        public static ObjectId FromGuidToObjectId(Guid src)
        {
            var srcArray = src.ToByteArray();
            var targetArray = new byte[12];
            targetArray[0] = srcArray[5];
            targetArray[1] = srcArray[4];
            targetArray[2] = srcArray[7];
            targetArray[3] = srcArray[6];
            targetArray[4] = srcArray[8];
            targetArray[5] = srcArray[9];
            targetArray[6] = srcArray[10];
            targetArray[7] = srcArray[11];
            targetArray[8] = srcArray[12];
            targetArray[9] = srcArray[13];
            targetArray[10] = srcArray[14];
            targetArray[11] = srcArray[15];

            var target = new ObjectId(targetArray);
            return target;
        }

        public static Guid CreateNewID(Guid[] array)
        {
            if (null != array)
            {
                var guidByteLength = Guid.Empty.ToByteArray().Length;
                var byteArray = new byte[array.Length*guidByteLength];
                for (int m = 0; m < array.Length; m++)
                {
                    var itemByteArray = array[m].ToByteArray();
                    for (int k = 0; k < guidByteLength; k++)
                    {
                        byteArray[m * guidByteLength + k] = itemByteArray[k];
                    }
                }

                return  SUID.FromStringToGuid(Convertor.Encode_MD5(byteArray));
            }
            return Guid.Empty;
        }

        public static Guid FromMD5ToGuid(byte[] md5Array) {
            return new Guid(md5Array);
        }

        public static Guid FromStringToGuid(string input)
        {
            if (string.IsNullOrWhiteSpace(input))
            {
                return Guid.Empty;
            }
            else if (24 == input.Length)
            {
                return SUID.FromObjectIdToGuid(ObjectId.Parse(input));
            }
            return Guid.Parse(input);
        }

        public static bool IsMax(string input) {
            return Guid.Empty.ToString().Replace("-", string.Empty).Replace("0", "F") == input || ObjectId.Empty.ToString().Replace("0", "F") == input;
        }
    }
}
