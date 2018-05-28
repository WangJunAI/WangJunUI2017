using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public class BasePermission: IPermission
    {
        public Guid  GroupID { get; set; }

        public Guid  GroupName { get; set; }
        public Guid  ObjectID { get; set; }

        public int  ObjectType { get; set; }

        public string  ObjectTypeName { get; set; }

        public Guid  OperatorID { get; set; }

        public string  OperatorName { get; set; }

        public int OperatorType { get; set; }

        public bool  AllowDownload { get; set; }

        public bool  AllowRead { get; set; }

        public bool  AllowModify { get; set; }

        public bool  AllowDelete { get; set; }

        public bool  AllowComment { get; set; }

        public bool  AllowFavorite { get; set; }

        public bool  AllowLike { get; set; }

        public bool  AllowSubmit { get; set; }

        public bool  AllowLogin { get; set; }
    }
}
