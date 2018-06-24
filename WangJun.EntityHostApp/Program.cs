using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;
using WangJun.DB;
using WangJun.Entity;
using WangJun.Utility;
using WangJun.YunPan;

namespace WangJun.EntityHostApp
{
    class Program
    {
        static Timer timer = new Timer(100 * 1000);
        static void Main(string[] args)
        {
            Task云盘转储();
            //timer.Start();
            timer.Elapsed += Timer_Elapsed;
            Console.ReadKey();
        }

        private static void Timer_Elapsed(object sender, ElapsedEventArgs e)
        {
            LOGGER.Log(e.SignalTime);
            
        }

        static void Task云盘转储()
        {
            new Task(() =>
            {
                new YunPanWebAPI().SaveToGridFS();
                LOGGER.Log("处理完毕");
            }).Start() ;

        }
    }
}
