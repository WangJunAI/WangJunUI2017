using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public interface IRelationshipInt64
    {
        long _ID64 { get; set; }

        long _ParentID64 { get; set; }

        long _RootID64 { get; set; }
    }
}
