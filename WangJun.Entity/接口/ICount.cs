using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public interface ICount
    {
        int ReadCount { get; set; }

        int LikeCount { get; set; }

        int FavoriteCount { get; set; }

        int CommentCount { get; set; }

        int DownloadCount { get; set; }

    }
}
