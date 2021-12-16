<?php

namespace App\Admin;

class NewsAdmin extends ArticleAdmin
{
    protected const CHOICES = ['news'];

    protected $baseRouteName = 'admin_news';
    protected $baseRoutePattern = 'news';
}
