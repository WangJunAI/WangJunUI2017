﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public interface IEntity
    {
        int Save();
        int Remove();

        int Load();
        
     }
}
