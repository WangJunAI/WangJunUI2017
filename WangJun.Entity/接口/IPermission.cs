using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public interface IPermission
    {
        Guid GroupID { get; set; }

        Guid GroupName { get; set; }
        Guid ObjectID { get; set; }

        int ObjectType { get; set; }

        string ObjectTypeName { get; set; }

        Guid OperatorID { get; set; }

        string OperatorName { get; set; }

        int OperatorType { get; set; }

        bool AllowDownload { get; set; }

        bool AllowRead { get; set; }

        bool AllowModify { get; set; }

        bool AllowDelete { get; set; }

        bool AllowComment { get; set; }

        bool AllowFavorite { get; set; }

        bool AllowLike { get; set; }

        bool AllowSubmit { get; set; }

        bool AllowLogin { get; set; }

    }
}
