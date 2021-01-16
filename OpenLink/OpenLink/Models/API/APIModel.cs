﻿
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OpenLink.Models
{
    public class APIModel
    {
        public Guid ID { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        [Required]
        public List<Link> Links { get; set; }
        [Required]
        public Guid UserID { get; set; }

    }
}
