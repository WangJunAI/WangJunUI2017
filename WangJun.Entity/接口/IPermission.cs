using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public interface IPermission
    {
        long SourceEntityID { get; set; }

        long TargetEntityID { get; set; }

        bool AllowDownload { get; set; }

        bool AllowRead { get; set; }

        bool AllowModify { get; set; }

        bool AllowDelete { get; set; }

        bool AllowComment { get; set; }

        bool AllowFavorite { get; set; }

        bool AllowLike { get; set; }
         
    }
}
